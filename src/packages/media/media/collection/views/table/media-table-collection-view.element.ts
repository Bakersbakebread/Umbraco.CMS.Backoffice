import { html, customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

@customElement('umb-media-table-collection-view1')
export class UmbMediaTableCollectionView1Element extends UmbLitElement {

	constructor() {
		super();
		}



	render() {
		return html`<h1>Media Table Collection View</h1>`;
	}

}

export default UmbMediaTableCollectionView1Element;

declare global {
	interface HTMLElementTagNameMap {
		'umb-media-table-collection-view1': UmbMediaTableCollectionView1Element;
	}
}
