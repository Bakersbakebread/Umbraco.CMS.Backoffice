import { html } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property, state } from 'lit/decorators.js';
import { UmbUploadFieldInputElement } from '../../../components/upload-field-input/upload-field-input.element';
import type { DataTypePropertyPresentationModel } from '@umbraco-cms/backoffice/backend-api';
import type { UmbPropertyEditorElement } from '@umbraco-cms/backoffice/property-editor';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';

/**
 * @element umb-property-editor-ui-upload-field
 */
@customElement('umb-property-editor-ui-upload-field')
export class UmbPropertyEditorUIUploadFieldElement extends UmbLitElement implements UmbPropertyEditorElement {
	static styles = [UUITextStyles];

	@property()
	value = '';

	@property({ type: Array, attribute: false })
	public set config(config: Array<DataTypePropertyPresentationModel>) {
		const fileExtensions = config.find((x) => x.alias === 'fileExtensions');
		if (fileExtensions) this._fileExtensions = fileExtensions.value;

		const multiple = config.find((x) => x.alias === 'multiple');
		if (multiple) this._multiple = multiple.value;
	}

	@state()
	private _fileExtensions?: Array<string>;

	@state()
	private _multiple?: boolean;

	private _onChange(event: CustomEvent) {
		this.value = (event.target as unknown as UmbUploadFieldInputElement).value as string;
		this.dispatchEvent(new CustomEvent('property-value-change'));
	}

	render() {
		return html`<umb-upload-field-input
			@change="${this._onChange}"
			?multiple="${this._multiple}"
			.fileExtensions="${this._fileExtensions}"></umb-upload-field-input>`;
	}
}

export default UmbPropertyEditorUIUploadFieldElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-upload-field': UmbPropertyEditorUIUploadFieldElement;
	}
}
