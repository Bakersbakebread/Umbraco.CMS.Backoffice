import { UmbBlockGridEntriesContext } from '../../context/block-grid-entries.context.js';
import type { UmbBlockGridLayoutModel } from '@umbraco-cms/backoffice/block';
import { html, customElement, state, repeat, css, property } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';

/**
 * @element umb-property-editor-ui-block-grid-entries
 */
@customElement('umb-property-editor-ui-block-grid-entries')
export class UmbPropertyEditorUIBlockGridEntriesElement extends UmbLitElement {
	//
	// TODO: Make sure Sorter callbacks handles columnSpan when retrieving a new entry.

	#context = new UmbBlockGridEntriesContext(this);

	@property({ attribute: false })
	public set layoutEntries(value: Array<UmbBlockGridLayoutModel>) {
		this.#context.setLayoutEntries(value);
	}
	public get layoutEntries(): Array<UmbBlockGridLayoutModel> {
		return this.#context.getLayoutEntries();
	}

	@property({ attribute: false })
	public set parentUnique(value: string | null) {
		this.#context.setParentKey(value);
	}
	public get parentUnique(): string | null {
		return this.#context.getParentKey();
	}

	@property({ attribute: false })
	public set areaKey(value: string | null) {
		this.#context.setAreaKey(value);
	}
	public get areaKey(): string | null {
		return this.#context.getAreaKey();
	}

	@state()
	private _layoutEntries: Array<UmbBlockGridLayoutModel> = [];

	@state()
	private _createButtonLabel = this.localize.term('blockEditor_addBlock');

	constructor() {
		super();
		this.observe(this.#context.layoutEntries, (layoutEntries) => {
			this._layoutEntries = layoutEntries;
		});
	}

	/**
	 * TODO:
	BLOCK     - element with entry(AreaS) context      areas observable
		> AREA 1     - element med entries(Area) context      area/entries observable
			> BLOCK A
			> BLOCK B
		> AREA 2
			> BLOCK C
			> BLOCK D
	 */
	render() {
		// TODO: Missing ability to jump directly to creating a Block, when there is only one Block Type.
		return html` ${repeat(
				this._layoutEntries,
				(x) => x.contentUdi,
				(layoutEntry, index) =>
					html`<uui-button-inline-create
							href=${this.#context.getPathForCreateBlock(index) ?? ''}></uui-button-inline-create>
						<umb-property-editor-ui-block-list-block data-udi=${layoutEntry.contentUdi} .layout=${layoutEntry}>
						</umb-property-editor-ui-block-list-block> `,
			)}
			<uui-button-group>
				<uui-button
					id="add-button"
					look="placeholder"
					label=${this._createButtonLabel}
					href=${this.#context.getPathForCreateBlock(-1) ?? ''}></uui-button>
				<uui-button
					label=${this.localize.term('content_createFromClipboard')}
					look="placeholder"
					href=${this.#context.getPathForClipboard(-1) ?? ''}>
					<uui-icon name="icon-paste-in"></uui-icon>
				</uui-button>
			</uui-button-group>`;
		//
	}

	static styles = [
		UmbTextStyles,
		css`
			:host {
				display: grid;
				gap: 1px;
			}
			> div {
				display: flex;
				flex-direction: column;
				align-items: stretch;
			}

			uui-button-group {
				padding-top: 1px;
				display: grid;
				grid-template-columns: 1fr auto;
			}
		`,
	];
}

export default UmbPropertyEditorUIBlockGridEntriesElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-block-grid-entries': UmbPropertyEditorUIBlockGridEntriesElement;
	}
}
