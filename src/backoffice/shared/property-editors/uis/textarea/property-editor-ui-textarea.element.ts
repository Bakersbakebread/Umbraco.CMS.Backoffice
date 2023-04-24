import { css, html } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property, state } from 'lit/decorators.js';
import { UUITextareaElement } from '@umbraco-ui/uui';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
	UmbWorkspacePropertyContext,
	UMB_WORKSPACE_PROPERTY_CONTEXT_TOKEN,
} from '../../../../shared/components/workspace-property/workspace-property.context';
import { UmbPropertyEditorElement } from '@umbraco-cms/backoffice/property-editor';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import type { DataTypePropertyPresentationModel } from '@umbraco-cms/backoffice/backend-api';

@customElement('umb-property-editor-ui-textarea')
export class UmbPropertyEditorUITextareaElement extends UmbLitElement implements UmbPropertyEditorElement {
	static styles = [
		UUITextStyles,
		css`
			uui-textarea {
				width: 100%;
			}
		`,
	];

	@property()
	value = '';

	@state()
	private _rows = 10; // default

	@state()
	private _maxlength?: number;

	@property({ type: Array, attribute: false })
	public set config(config: Array<DataTypePropertyPresentationModel>) {
		const rows = config.find((x) => x.alias === 'rows');
		if (rows) this._rows = rows.value;

		const maxlength = config.find((x) => x.alias === 'maxChars');
		if (maxlength) this._rows = maxlength.value;
	}

	private propertyContext?: UmbWorkspacePropertyContext<string>;

	constructor() {
		super();

		this.consumeContext(UMB_WORKSPACE_PROPERTY_CONTEXT_TOKEN, (instance: UmbWorkspacePropertyContext<string>) => {
			this.propertyContext = instance;
		});
	}

	private onInput(e: InputEvent) {
		this.value = (e.target as UUITextareaElement).value as string;
		this.dispatchEvent(new CustomEvent('property-value-change'));
	}

	render() {
		return html` <uui-textarea
			maxlength="${ifDefined(this._maxlength)}"
			.rows=${this._rows}
			.value=${this.value}
			@input=${this.onInput}></uui-textarea>`;
	}
}

export default UmbPropertyEditorUITextareaElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-textarea': UmbPropertyEditorUITextareaElement;
	}
}
