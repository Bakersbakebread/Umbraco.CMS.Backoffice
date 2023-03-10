import { html } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { UmbInputTagsElement } from '../../../../shared/components/input-tags/input-tags.element';
import { UmbLitElement } from '@umbraco-cms/element';
import { DataTypePropertyModel } from '@umbraco-cms/backend-api';

/**
 * @element umb-property-editor-ui-tags
 */
@customElement('umb-property-editor-ui-tags')
export class UmbPropertyEditorUITagsElement extends UmbLitElement {
	static styles = [UUITextStyles];

	@property()
	value: string[] = [];

	@state()
	private _group?: string;

	@property({ type: Array, attribute: false })
	public set config(config: Array<DataTypePropertyModel>) {
		const group = config.find((x) => x.alias === 'group');
		if (group) this._group = group.value as string;

		const items = config.find((x) => x.alias === 'items');
		if (items) this.value = items.value as Array<string>;
	}
	private _onChange(event: CustomEvent) {
		this.value = ((event.target as UmbInputTagsElement).value as string).split(',');
		this.dispatchEvent(new CustomEvent('property-value-change'));
	}

	render() {
		return html`<umb-input-tags
			group="${ifDefined(this._group)}"
			.items="${this.value}"
			@change="${this._onChange}"></umb-input-tags>`;
	}
}

export default UmbPropertyEditorUITagsElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-tags': UmbPropertyEditorUITagsElement;
	}
}
