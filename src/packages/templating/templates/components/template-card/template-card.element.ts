import { css, html, customElement, property, ifDefined, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UUICardElement, UUITextStyles } from '@umbraco-cms/backoffice/external/uui';

/**
 * @element umb-template-card
 * @slot actions
 * @fires open
 * @fires selected
 */
// TODO: This should extends the UUICardElement, and the visual look of this should be like the UserCard or similarly.
// TOOD: Consider if this should be select in the 'persisted'-select style when it is selected as a default. (But its should not use the runtime-selection style)
@customElement('umb-template-card')
export class UmbTemplateCardElement extends UUICardElement {
	@property({ type: String })
	name = '';

	protected getFormElement() {
		return undefined;
	}

	render() {
		return html`<div id="card">
			<a
				tabindex=${this.disabled ? (nothing as any) : '0'}
				id="open-part"
				href="${ifDefined(this.href)}"
				.target=${this.target as string}
				@click=${this.handleOpenClick}
				@keydown=${this.handleOpenKeydown}>
				<uui-icon class="logo" name="umb:layout"></uui-icon>
				<strong>${this.name}</strong>
			</a>
			<slot name="badge"></slot>
			<slot name="actions"></slot>
			<slot></slot>
		</div>`;
	}

	static styles = [
		UUITextStyles,
		css`
			:host {
				box-sizing: border-box;
				display: contents;
				height: 100%;
			}

			#card {
				position: relative;
				width: 100%;
				max-width: 180px;
				display: flex;
				gap: var(--uui-size-space-2);
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				border-radius: var(--uui-border-radius);
				border: 1px solid var(--uui-color-divider-emphasis);
				background-color: var(--uui-color-background);
				padding: var(--uui-size-4);
			}

			#open-part {
				text-align: center;
				display: flex;
				gap: var(--uui-size-space-2);
				flex-direction: column;
				flex: 1;
				font-weight: bold;
				align-items: center;
				text-decoration: none;
				color: var(--uui-color-text);
			}

			:host([disabled]) #open-part {
				pointer-events: none;
			}

			#open-part:focus,
			#open-part:focus uui-icon,
			#open-part:hover,
			#open-part:hover uui-icon {
				cursor: pointer;
				text-decoration: underline;
				color: var(--uui-color-interactive-emphasis);
			}

			#open-part uui-icon {
				font-size: var(--uui-size-20);
				color: var(--uui-color-divider-emphasis);
			}

			/** Slots */
			/**TODO: Find a better solution for the badge and action slot */
			slot[name='actions'] {
				position: absolute;
				top: var(--uui-size-4);
				right: var(--uui-size-4);
				display: flex;
				justify-content: right;
				opacity: 0;
				transition: opacity 120ms;
			}

			slot[name='badge'] {
				position: absolute;
				top: var(--uui-size-4);
				right: var(--uui-size-4);
				display: flex;
				justify-content: right;
			}

			:host(:focus-within) slot[name='actions'],
			:host(:hover) slot[name='actions'] {
				opacity: 1;
			}
		`,
	];
}

export default UmbTemplateCardElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-template-card': UmbTemplateCardElement;
	}
}
