import { css, html, LitElement } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, state } from 'lit/decorators.js';
import { UmbContextConsumerMixin } from '../../../../../core/context';
import { Subscription } from 'rxjs';
import UmbSectionViewUsersElement, {
	UserItem,
} from '../../../../sections/users/views/users/section-view-users.element';

@customElement('umb-editor-view-users-selection')
export class UmbEditorViewUsersSelectionElement extends UmbContextConsumerMixin(LitElement) {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: flex;
				gap: var(--uui-size-3);
				width: 100%;
				padding: var(--uui-size-space-4) var(--uui-size-space-6);
				background-color: var(--uui-color-selected);
				color: var(--uui-color-selected-contrast);
				align-items: center;
				box-sizing: border-box;
			}
		`,
	];

	@state()
	private _users: Array<UserItem> = [];

	@state()
	private _selection: Array<string> = [];

	private _usersContext?: UmbSectionViewUsersElement;
	private _usersSubscription?: Subscription;
	private _selectionSubscription?: Subscription;

	connectedCallback(): void {
		super.connectedCallback();

		this.consumeContext('umbUsersContext', (usersContext: UmbSectionViewUsersElement) => {
			this._usersContext = usersContext;

			this._usersSubscription?.unsubscribe();
			this._selectionSubscription?.unsubscribe();
			this._usersSubscription = this._usersContext?.users.subscribe((users: Array<UserItem>) => {
				this._users = users;
			});
			this._selectionSubscription = this._usersContext?.selection.subscribe((selection: Array<string>) => {
				this._selection = selection;
			});
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();

		this._usersSubscription?.unsubscribe();
		this._selectionSubscription?.unsubscribe();
	}

	private _handleClearSelection() {
		this._usersContext?.setSelection([]);
	}

	private _renderSelectionCount() {
		return html`<div>${this._selection.length} of ${this._users.length} selected</div>`;
	}

	render() {
		return html`<uui-button @click=${this._handleClearSelection} label="Clear selection" look="secondary"></uui-button>
			${this._renderSelectionCount()}
			<uui-button style="margin-left: auto" label="Set group" look="secondary"></uui-button>
			<uui-button label="Enable" look="secondary"></uui-button>
			<uui-button label="Unlock" disabled look="secondary"></uui-button>
			<uui-button label="Disable" look="secondary"></uui-button> `;
	}
}

export default UmbEditorViewUsersSelectionElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-editor-view-users-selection': UmbEditorViewUsersSelectionElement;
	}
}
