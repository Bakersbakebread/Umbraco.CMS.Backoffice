import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { customElement, property, state } from 'lit/decorators.js';

import { UMB_DATA_TYPE_DETAIL_STORE_CONTEXT_TOKEN } from '../../../settings/data-types/repository/data-type.store';
import type { UmbDataTypeStore } from '../../../settings/data-types/repository/data-type.store';
//import type { ContentProperty } from '@umbraco-cms/models';
import type { DataType, DataTypeProperty, DocumentTypePropertyType } from '@umbraco-cms/backend-api';

import '../workspace-property/workspace-property.element';
import { UmbLitElement } from '@umbraco-cms/element';
import { UmbObserverController } from '@umbraco-cms/observable-api';

@customElement('umb-content-property')
export class UmbContentPropertyElement extends UmbLitElement {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: block;
			}
		`,
	];

	// TODO: Consider if we just need to get the DataType Key?..
	// TODO: consider if we should make a base type of the DocumentTypePropertyType, which could become the ContentProperty. A shared common type for all properties.
	private _property?: DocumentTypePropertyType;
	@property({ type: Object, attribute: false })
	public get property(): DocumentTypePropertyType | undefined {
		return this._property;
	}
	public set property(value: DocumentTypePropertyType | undefined) {
		const oldProperty = this._property;
		this._property = value;
		if (this._property?.dataTypeKey !== oldProperty?.dataTypeKey) {
			this._observeDataType(this._property?.dataTypeKey);
		}
	}

	@property()
	value?: object | string;

	@state()
	private _propertyEditorUiAlias?: string;

	@state()
	private _dataTypeData: DataTypeProperty[] = [];

	private _dataTypeStore?: UmbDataTypeStore;
	private _dataTypeObserver?: UmbObserverController<DataType | null>;

	constructor() {
		super();

		this.consumeContext(UMB_DATA_TYPE_DETAIL_STORE_CONTEXT_TOKEN, (instance) => {
			this._dataTypeStore = instance;
			this._observeDataType(this._property?.dataTypeKey);
		});
	}

	private _observeDataType(dataTypeKey?: string) {
		if (!this._dataTypeStore) return;

		this._dataTypeObserver?.destroy();
		if (dataTypeKey) {
			this._dataTypeObserver = this.observe(this._dataTypeStore.getByKey(dataTypeKey), (dataType) => {
				this._dataTypeData = dataType?.data || [];
				this._propertyEditorUiAlias = dataType?.propertyEditorUiAlias || undefined;
			});
		}
	}

	render() {
		return html`<umb-workspace-property
			alias=${ifDefined(this._property?.alias)}
			label=${ifDefined(this._property?.name)}
			description=${ifDefined(this._property?.description || undefined)}
			property-editor-ui-alias=${ifDefined(this._propertyEditorUiAlias)}
			.value=${this.value}
			.config=${this._dataTypeData}></umb-workspace-property>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-content-property': UmbContentPropertyElement;
	}
}
