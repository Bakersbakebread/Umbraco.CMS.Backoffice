import { UUITextStyles } from '@umbraco-ui/uui-css';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
	UUIBooleanInputEvent,
	UUICheckboxElement,
	UUIInputEvent,
	UUIRadioGroupElement,
	UUIRadioGroupEvent,
} from '@umbraco-ui/uui';

import { UMB_COLLECTION_CONTEXT_TOKEN } from '@umbraco-cms/backoffice/collection';

import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import { UmbUserGroupCollectionContext } from './user-group-collection.context';

@customElement('umb-user-group-collection-header')
export class UmbUserGroupCollectionHeaderElement extends UmbLitElement {
	#collectionContext?: UmbUserGroupCollectionContext;

	constructor() {
		super();

		this.consumeContext(UMB_COLLECTION_CONTEXT_TOKEN, (instance) => {
			this.#collectionContext = instance as UmbUserGroupCollectionContext;
		});
	}

	#onCreate() {
		//TODO Navigate to create workspace
	}

	#onSearch(event: UUIInputEvent) {
		//TODO Search
	}

	render() {
		return html`
			<div id="sticky-top">
				<div id="collection-top-bar">
					<uui-button @click=${this.#onCreate} label="Create group" look="outline"></uui-button>
					<uui-input @input=${this.#onSearch} label="search" id="input-search"></uui-input>
				</div>
			</div>
		`;
	}
	static styles = [
		UUITextStyles,
		css`
			#sticky-top {
				position: sticky;
				top: 0px;
				z-index: 1;
				box-shadow: 0 1px 3px rgba(0, 0, 0, 0), 0 1px 2px rgba(0, 0, 0, 0);
				transition: 250ms box-shadow ease-in-out;
			}

			#sticky-top.header-shadow {
				box-shadow: var(--uui-shadow-depth-2);
			}

			#collection-top-bar {
				padding: var(--uui-size-space-4) var(--uui-size-layout-1);
				background-color: var(--uui-color-background);
				display: flex;
				justify-content: space-between;
				white-space: nowrap;
				gap: var(--uui-size-space-5);
				align-items: center;
			}

			#input-search {
				width: 100%;
			}
		`,
	];
}

export default UmbUserGroupCollectionHeaderElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-user-group-collection-header': UmbUserGroupCollectionHeaderElement;
	}
}
