import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property, state } from 'lit/decorators.js';
import { UmbSuggestionsInputElement } from '../../components';
import { UmbPropertyEditorExtensionElement } from '@umbraco-cms/backoffice/extension-registry';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import { UmbDataTypePropertyCollection } from '@umbraco-cms/backoffice/data-type';

@customElement('umb-suggestions-picker')
export class UmbSuggestionsPickerElement extends UmbLitElement implements UmbPropertyEditorExtensionElement {
	@property({ type: String })
	public value = '';

	@state()
	private _disabled?: boolean;

	@state()
	private _placeholder?: string;

	@property({ type: Array, attribute: false })
	public set config(config: UmbDataTypePropertyCollection) {
		const disabled = config.find((x) => x.alias === 'disabled');
		if (disabled) this._disabled = disabled.value;

		const placeholder = config.find((x) => x.alias === 'placeholder');
		if (placeholder) this._placeholder = placeholder.value;
	}

	#onChange(e: CustomEvent) {
		this.value = (e.target as UmbSuggestionsInputElement).value as string;
		this.dispatchEvent(new CustomEvent('property-value-change'));
	}

	render() {
		return html`<umb-suggestions-input
			.value=${this.value}
			placeholder=${ifDefined(this._placeholder)}
			@change=${this.#onChange}
			?disabled=${this._disabled}></umb-suggestions-input> `;
	}
}

export default UmbSuggestionsPickerElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-suggestions-picker': UmbSuggestionsPickerElement;
	}
}
