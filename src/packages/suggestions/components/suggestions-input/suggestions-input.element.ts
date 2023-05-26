import { css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { UUIInputElement, UUIInputEvent } from '@umbraco-ui/uui';
import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import { UmbModalContext, UMB_MODAL_CONTEXT_TOKEN, UMB_CONFIRM_MODAL } from '@umbraco-cms/backoffice/modal';
import { UmbContextConsumerController } from '@umbraco-cms/backoffice/context-api';
import {
	UMB_NOTIFICATION_CONTEXT_TOKEN,
	UmbNotificationContext,
	UmbNotificationDefaultData,
} from '@umbraco-cms/backoffice/notification';

@customElement('umb-suggestions-input')
export class UmbSuggestionsInputElement extends FormControlMixin(UmbLitElement) {
	@property({ type: Boolean })
	disabled = false;

	@property({ type: String })
	placeholder?: string;

	@property({ type: Number })
	maxLength = 20;

	@query('#suggestion-input')
	private _suggestionInput!: UUIInputElement;

	@state()
	private _suggestions = [
		'You should take a break',
		'I suggest that you visit the Eiffel Tower',
		'How about starting a book club today or this week?',
		'Are you hungry?',
	];
	private _modalContext?: UmbModalContext;
	private _notificationContext?: UmbNotificationContext;

	constructor() {
		super();
		this.consumeContext(UMB_MODAL_CONTEXT_TOKEN, (instance) => {
			this._modalContext = instance;
		});
		this.consumeContext(UMB_NOTIFICATION_CONTEXT_TOKEN, (instance) => {
			this._notificationContext = instance;
		});

		/*
		new UmbContextConsumerController(this, UMB_NOTIFICATION_CONTEXT_TOKEN, (_instance) => {
			this._notificationContext = _instance;
		});*/
	}

	protected getFormElement() {
		return this._suggestionInput;
	}

	#textTrimmer() {
		if (!this.value || (this.value as string).length <= this.maxLength) {
			const data: UmbNotificationDefaultData = {
				message: `Nothing to trim!`,
			};
			this._notificationContext?.peek('danger', { data });
			return;
		}

		const trimmed = (this.value as string).substring(0, this.maxLength);
		const modalHandler = this._modalContext?.open(UMB_CONFIRM_MODAL, {
			headline: `Trim text`,
			content: `Do you want to trim the text to "${trimmed}"?`,
			color: 'danger',
			confirmLabel: 'Trim',
		});

		modalHandler?.onSubmit().then(() => {
			this.value = trimmed;
			this.#dispatchChangeEvent();
			const data: UmbNotificationDefaultData = {
				headline: `Text trimmed`,
				message: `You trimmed the text!`,
			};
			this._notificationContext?.peek('positive', { data });
		}, null);
	}

	#onInput(e: UUIInputEvent) {
		this.value = e.target.value as string;
		this.#dispatchChangeEvent();
	}

	#onSuggestion() {
		const randomIndex = (this._suggestions.length * Math.random()) | 0;
		this.value = this._suggestions[randomIndex];
		this.#dispatchChangeEvent();
	}

	#dispatchChangeEvent() {
		this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }));
	}

	render() {
		return html`<div class="blue-text">${this.value}</div>
			<uui-input
				id="suggestion-input"
				class="element"
				label="text input"
				.placeholder="${this.placeholder}"
				.maxlength=${this.maxLength}
				.value="${this.value || ''}"
				@input=${this.#onInput}></uui-input>
			<div id="wrapper">
				<uui-button
					id="suggestion-button"
					class="element"
					look="primary"
					label="give me suggestions"
					@click=${this.#onSuggestion}
					?disabled=${this.disabled}>
					Give me suggestions!
				</uui-button>
				<uui-button
					id="suggestion-trimmer"
					class="element"
					look="outline"
					label="Trim text"
					@click=${this.#textTrimmer}>
					Trim text
				</uui-button>
			</div> `;
	}

	static styles = [
		css`
			.blue-text {
				color: var(--uui-color-focus);
			}
			#wrapper {
				margin-top: 10px;
				display: flex;
				gap: 10px;
			}
			.element {
				width: 100%;
			}
		`,
	];
}

export default UmbSuggestionsInputElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-suggestions-input': UmbSuggestionsInputElement;
	}
}
