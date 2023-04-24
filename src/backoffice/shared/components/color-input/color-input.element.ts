import { html } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property } from 'lit/decorators.js';
import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { UUIColorSwatchesEvent } from '@umbraco-ui/uui';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import type { SwatchDetails } from '@umbraco-cms/backoffice/models';

/*
 * This wraps the UUI library uui-color-swatches component
 * @element umb-color-picker-input
 */
@customElement('umb-color-input')
export class UmbColorInputElement extends FormControlMixin(UmbLitElement) {
	static styles = [UUITextStyles];

	@property({ type: Boolean })
	showLabels = false;

	@property()
	swatches?: SwatchDetails[];

	constructor() {
		super();
	}

	protected getFormElement() {
		return undefined;
	}

	private _onChange(e: UUIColorSwatchesEvent) {
		e.stopPropagation();
		super.value = e.target.value;
		this.dispatchEvent(new CustomEvent('change'));
	}

	render() {
		return html`
			<uui-color-swatches @change="${this._onChange}" label="Color picker">${this._renderColors()} </uui-color-swatches>
		`;
	}

	private _renderColors() {
		return html`${this.swatches?.map((swatch) => {
			return html`<uui-color-swatch
				label="${swatch.label}"
				value="${swatch.value}"
				.showLabel=${this.showLabels}></uui-color-swatch>`;
		})}`;
	}
}

export default UmbColorInputElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-color-ipnut': UmbColorInputElement;
	}
}
