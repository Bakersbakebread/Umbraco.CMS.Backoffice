import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import {
	customElement,
	css,
	html,
	property,
	state,
	repeat,
	nothing,
	type PropertyValueMap,
} from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';
import { UmbPropertyValueChangeEvent, type UmbPropertyEditorUiElement } from '@umbraco-cms/backoffice/property-editor';

type Extension = {
	alias: string;
	label: string;
	icon: string;
};

@customElement('umb-property-editor-ui-tiptap-toolbar-configuration')
export class UmbPropertyEditorUiTiptapToolbarConfigurationElement
	extends UmbLitElement
	implements UmbPropertyEditorUiElement
{
	@property({ attribute: false })
	set value(value: string[][][] | undefined) {
		if (!value) {
			this.#useDefault = true;
			this.#value = [[[]]];
			return;
		}

		// TODO: This can be optimized with cashing;
		this.#value = value.map((rows) => rows.map((groups) => [...groups]));
	}

	get value(): string[][][] {
		// TODO: This can be optimized with cashing;
		return this.#value.map((rows) => rows.map((groups) => [...groups]));
	}

	#useDefault = false;

	#value: string[][][] = [[[]]];

	@state()
	_extensions: Extension[] = [];

	#currentDragItem?: {
		alias: string;
		fromPos?: [number, number, number];
	};

	protected override async firstUpdated(_changedProperties: PropertyValueMap<unknown>) {
		super.firstUpdated(_changedProperties);

		this.observe(umbExtensionsRegistry.byType('tiptapToolbarExtension'), (extensions) => {
			this._extensions = extensions.map((ext) => {
				if (this.#useDefault && ext.meta.isDefault) {
					this.#value[0][0].push(ext.alias);
				}
				return {
					alias: ext.alias,
					label: ext.meta.label,
					icon: ext.meta.icon,
					category: '',
				};
			});

			if (this.#useDefault) {
				this.dispatchEvent(new UmbPropertyValueChangeEvent());
			}
		});
	}

	#onDragStart = (event: DragEvent, alias: string, fromPos?: [number, number, number]) => {
		event.dataTransfer!.effectAllowed = 'move';
		this.#currentDragItem = { alias, fromPos };
	};

	#onDragOver = (event: DragEvent) => {
		event.preventDefault();
		event.dataTransfer!.dropEffect = 'move';
	};

	#onDragEnd = (event: DragEvent) => {
		event.preventDefault();
		if (event.dataTransfer?.dropEffect === 'none') {
			const { fromPos } = this.#currentDragItem ?? {};
			if (!fromPos) return;

			this.#removeItem(fromPos);
		}
	};

	#onDrop = (event: DragEvent, toPos?: [number, number, number]) => {
		event.preventDefault();
		const { alias, fromPos } = this.#currentDragItem ?? {};

		// Remove item if no destination position is provided
		if (fromPos && !toPos) {
			this.#removeItem(fromPos);
			return;
		}
		// Move item if both source and destination positions are available
		if (fromPos && toPos) {
			this.#moveItem(fromPos, toPos);
			return;
		}
		// Insert item if an alias and a destination position are provided
		if (alias && toPos) {
			this.#insertItem(alias, toPos);
		}
	};

	#moveItem = (from: [number, number, number], to: [number, number, number]) => {
		const [rowIndex, groupIndex, itemIndex] = from;

		// Get the item to move from the 'from' position
		const itemToMove = this.#value[rowIndex][groupIndex][itemIndex];

		// Remove the item from the original position
		this.#value[rowIndex][groupIndex].splice(itemIndex, 1);

		this.#insertItem(itemToMove, to);
	};

	#insertItem = (alias: string, toPos: [number, number, number]) => {
		const [rowIndex, groupIndex, itemIndex] = toPos;
		// Insert the item into the new position
		this.#value[rowIndex][groupIndex].splice(itemIndex, 0, alias);

		this.dispatchEvent(new UmbPropertyValueChangeEvent());
	};

	#removeItem(from: [number, number, number]) {
		const [rowIndex, groupIndex, itemIndex] = from;
		this.#value[rowIndex][groupIndex].splice(itemIndex, 1);

		this.dispatchEvent(new UmbPropertyValueChangeEvent());
	}

	#addGroup = (rowIndex: number, groupIndex: number) => {
		this.#value[rowIndex].splice(groupIndex, 0, []);
		this.dispatchEvent(new UmbPropertyValueChangeEvent());
	};

	#removeGroup = (rowIndex: number, groupIndex: number) => {
		if (groupIndex === 0) {
			// Prevent removing the last group
			this.#value[rowIndex][groupIndex] = [];
		} else {
			this.#value[rowIndex].splice(groupIndex, 1);
		}
		this.dispatchEvent(new UmbPropertyValueChangeEvent());
	};

	#addRow = (rowIndex: number) => {
		this.#value.splice(rowIndex, 0, [[]]);
		this.dispatchEvent(new UmbPropertyValueChangeEvent());
	};

	#removeRow = (rowIndex: number) => {
		if (rowIndex === 0) {
			// Prevent removing the last row
			this.#value[rowIndex] = [[]];
		} else {
			this.#value.splice(rowIndex, 1);
		}
		this.dispatchEvent(new UmbPropertyValueChangeEvent());
	};

	#renderItem(alias: string, rowIndex: number, groupIndex: number, itemIndex: number) {
		const extension = this._extensions.find((ext) => ext.alias === alias);
		if (!extension) return nothing;
		return html`<div
			title=${extension.label}
			class="item"
			draggable="true"
			@dragend=${this.#onDragEnd}
			@dragstart=${(e: DragEvent) => this.#onDragStart(e, alias, [rowIndex, groupIndex, itemIndex])}>
			<umb-icon name=${extension.icon ?? ''}></umb-icon>
		</div>`;
	}

	#renderGroup(group: string[], rowIndex: number, groupIndex: number) {
		return html`
			<div
				class="group"
				dropzone="move"
				@dragover=${this.#onDragOver}
				@drop=${(e: DragEvent) => this.#onDrop(e, [rowIndex, groupIndex, group.length])}>
				${group.map((alias, itemIndex) => this.#renderItem(alias, rowIndex, groupIndex, itemIndex))}
				<uui-button
					look="primary"
					color="danger"
					compact
					class="remove-group-button ${groupIndex === 0 && group.length === 0 ? 'hidden' : undefined}"
					@click=${() => this.#removeGroup(rowIndex, groupIndex)}>
					<umb-icon name="icon-trash"></umb-icon>
				</uui-button>
			</div>
		`;
	}

	#renderRow(row: string[][], rowIndex: number) {
		return html`
			<div class="row">
				${repeat(row, (group, groupIndex) => this.#renderGroup(group, rowIndex, groupIndex))}
				<uui-button look="secondary" @click=${() => this.#addGroup(rowIndex, row.length)}>+</uui-button>
				<uui-button
					look="primary"
					color="danger"
					compact
					class="remove-row-button ${rowIndex === 0 && row.length === 1 && row[0].length === 0 ? 'hidden' : undefined}"
					@click=${() => this.#removeRow(rowIndex)}>
					<umb-icon name="icon-trash"></umb-icon>
				</uui-button>
			</div>
		`;
	}

	override render() {
		return html`
			${repeat(this.#value, (row, rowIndex) => this.#renderRow(row, rowIndex))}
			<uui-button look="secondary" @click=${() => this.#addRow(this.#value.length)}>+</uui-button>
			${this.#renderExtensions()}
		`;
	}

	#renderExtensions() {
		// TODO: Can we avoid using a flat here? or is it okay for performance?
		return html`<div class="extensions" dropzone="move" @drop=${this.#onDrop} @dragover=${this.#onDragOver}>
			${repeat(
				this._extensions.filter((ext) => !this.#value.flat(2).includes(ext.alias)),
				(extension) => html`
					<div
						title=${extension.label}
						class="item"
						draggable="true"
						@dragend=${this.#onDragEnd}
						@dragstart=${(e: DragEvent) => this.#onDragStart(e, extension.alias)}>
						<umb-icon name=${extension.icon ?? ''}></umb-icon>
					</div>
				`,
			)}
		</div>`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: flex;
				flex-direction: column;
				gap: 6px;
			}
			.extensions {
				display: flex;
				flex-wrap: wrap;
				gap: 3px;
				border-radius: var(--uui-border-radius);
				background-color: var(--uui-color-surface-alt);
				padding: 6px;
				min-height: 30px;
				min-width: 30px;
			}
			.row {
				position: relative;
				display: flex;
				gap: 12px;
			}
			.group {
				position: relative;
				display: flex;
				gap: 3px;
				border-radius: var(--uui-border-radius);
				background-color: var(--uui-color-surface-alt);
				padding: 6px;
				min-height: 32px;
				min-width: 32px;
			}
			.item {
				padding: var(--uui-size-space-2);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				background-color: var(--uui-color-surface);
				cursor: move;
				display: flex;
				box-sizing: border-box;
				width: 32px;
				height: 32px;
				justify-content: center;
			}

			.remove-row-button,
			.remove-group-button {
				display: none;
			}
			.remove-group-button {
				position: absolute;
				top: -26px;
				left: 50%;
				transform: translateX(-50%);
				z-index: 1;
			}

			.row:hover .remove-row-button:not(.hidden),
			.group:hover .remove-group-button:not(.hidden) {
				display: flex;
			}
			umb-icon {
				/* Prevents titles from bugging out */
				pointer-events: none;
			}
		`,
	];
}

export default UmbPropertyEditorUiTiptapToolbarConfigurationElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-tiptap-toolbar-configuration': UmbPropertyEditorUiTiptapToolbarConfigurationElement;
	}
}
