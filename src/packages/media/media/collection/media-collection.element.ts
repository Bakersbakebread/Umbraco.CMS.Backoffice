import { customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbCollectionDefaultElement } from '@umbraco-cms/backoffice/collection';

@customElement('umb-media-collection')
export class UmbMediaCollectionElement extends UmbCollectionDefaultElement {}

export default UmbMediaCollectionElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-media-collection': UmbMediaCollectionElement;
	}
}
