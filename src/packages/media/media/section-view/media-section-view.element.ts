import { UMB_MEDIA_COLLECTION_ALIAS } from '../collection/index.js';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { css, html, customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import type { UmbRoute } from '@umbraco-cms/backoffice/router';

@customElement('umb-media-section-view')
export class UmbMediaSectionViewElement extends UmbLitElement {
	#routes: UmbRoute[] = [
		{
			path: 'collection',
			component: () => {
				const element = document.createElement('umb-collection');
				element.setAttribute('alias', UMB_MEDIA_COLLECTION_ALIAS);
				return element;
			},
		},
		{
			path: 'media',
			component: () => import('../workspace/media-workspace.element.js'),
		},
		{
			path: '',
			redirectTo: 'collection',
		},
	];

	render() {
		return html`<umb-router-slot id="router-slot" .routes=${this.#routes}></umb-router-slot>`;
	}

	static styles = [
		UmbTextStyles,
		css`
			:host {
				height: 100%;
			}

			#router-slot {
				height: calc(100% - var(--umb-header-layout-height));
			}
		`,
	];
}

export default UmbMediaSectionViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-media-section-view': UmbMediaSectionViewElement;
	}
}
