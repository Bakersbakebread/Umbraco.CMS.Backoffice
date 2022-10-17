//TODO: we need to figure out what components should be available for extensions and load them upfront
import './components/ref-property-editor-ui/ref-property-editor-ui.element';
import './components/backoffice-header.element';
import './components/backoffice-main.element';
import './components/backoffice-modal-container.element';
import './components/backoffice-notification-container.element';
import './components/node-property/node-property.element';
import './components/table/table.element';
import './sections/shared/section-main/section-main.element';
import './sections/shared/section-sidebar/section-sidebar.element';
import './sections/shared/section.element';
import './trees/shared/tree-base.element';
import './trees/shared/tree.element';

import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html, LitElement } from 'lit';
import type { Subscription } from 'rxjs';

import { UmbModalService } from '../core/services/modal';
import { UmbNotificationService } from '../core/services/notification';
import { UmbDataTypeStore } from '../core/stores/data-type/data-type.store';
import { UmbDocumentTypeStore } from '../core/stores/document-type.store';
import { UmbNodeStore } from '../core/stores/node.store';
import { UmbSectionStore } from '../core/stores/section.store';
import { UmbEntityStore } from '../core/stores/entity.store';
import { UmbUserStore } from '../core/stores/user/user.store';
import { UmbPropertyEditorStore } from '../core/stores/property-editor/property-editor.store';
import { UmbIconStore } from '../core/stores/icon/icon.store';
import { UmbPropertyEditorConfigStore } from '../core/stores/property-editor-config/property-editor-config.store';
import { UmbUserGroupStore } from '../core/stores/user/user-group.store';
import { UmbContextConsumerMixin, UmbContextProviderMixin } from '@umbraco-cms/context-api';

@defineElement('umb-backoffice')
export class UmbBackofficeElement extends UmbContextConsumerMixin(UmbContextProviderMixin(LitElement)) {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: flex;
				flex-direction: column;
				height: 100%;
				width: 100%;
				color: var(--uui-color-text);
				font-size: 14px;
				box-sizing: border-box;
			}
		`,
	];

	private _umbIconRegistry = new UmbIconStore();
	private _umbEntityStore = new UmbEntityStore();
	private _umbSectionStore?: UmbSectionStore;
	private _currentSectionSubscription?: Subscription;

	constructor() {
		super();

		this._umbIconRegistry.attach(this);

		this.provideContext('umbEntityStore', this._umbEntityStore);
		this.provideContext('umbNodeStore', new UmbNodeStore(this._umbEntityStore));
		this.provideContext('umbDataTypeStore', new UmbDataTypeStore(this._umbEntityStore));
		this.provideContext('umbDocumentTypeStore', new UmbDocumentTypeStore(this._umbEntityStore));
		this.provideContext('umbUserStore', new UmbUserStore(this._umbEntityStore));
		this.provideContext('umbUserGroupStore', new UmbUserGroupStore(this._umbEntityStore));
		this.provideContext('umbPropertyEditorStore', new UmbPropertyEditorStore());
		this.provideContext('umbPropertyEditorConfigStore', new UmbPropertyEditorConfigStore());
		this.provideContext('umbNotificationService', new UmbNotificationService());
		this.provideContext('umbModalService', new UmbModalService());

		// TODO: how do we want to handle context aware DI?
		this.consumeContext('umbExtensionRegistry', (extensionRegistry) => {
			this._umbSectionStore = new UmbSectionStore(extensionRegistry);
			this.provideContext('umbSectionStore', this._umbSectionStore);
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this._currentSectionSubscription?.unsubscribe();
	}

	render() {
		return html`
			<umb-backoffice-header></umb-backoffice-header>
			<umb-backoffice-main></umb-backoffice-main>
			<umb-backoffice-notification-container></umb-backoffice-notification-container>
			<umb-backoffice-modal-container></umb-backoffice-modal-container>
		`;
	}
}

export default UmbBackofficeElement;
declare global {
	interface HTMLElementTagNameMap {
		'umb-backoffice': UmbBackofficeElement;
	}
}
