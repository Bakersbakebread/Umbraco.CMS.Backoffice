import { css, html, LitElement } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, state } from 'lit/decorators.js';
import { UmbContextConsumerMixin } from '../../../../../core/context';
import UmbEditorViewUsersElement, { UserItem } from './editor-view-users.element';
import { Subscription } from 'rxjs';

@customElement('umb-editor-view-users-user-details')
export class UmbEditorViewUsersUserDetailsElement extends UmbContextConsumerMixin(LitElement) {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: grid;
				grid-template-columns: 1fr 350px;
				gap: var(--uui-size-space-6);
				padding: var(--uui-size-space-6);
			}

			#left-column {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-4);
			}
			#right-column > uui-box > div {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
			}
			uui-avatar {
				width: 50%;
				flex: 1 1 0%;
				place-self: center;
			}
			hr {
				border: none;
				border-bottom: 1px solid var(--uui-color-divider);
				width: 100%;
			}
			uui-input {
				width: 100%;
			}
			.faded-text {
				color: var(--uui-color-text-alt);
			}
		`,
	];

	@state()
	private _users: Array<UserItem> = [];

	@state()
	private _user?: UserItem;

	protected _usersContext?: UmbEditorViewUsersElement;
	protected _usersSubscription?: Subscription;

	private _languages = [
		{ name: 'English', value: 'en', selected: true },
		{ name: 'Dutch', value: 'nl' },
		{ name: 'French', value: 'fr' },
		{ name: 'German', value: 'de' },
		{ name: 'Spanish', value: 'es' },
	];

	connectedCallback(): void {
		super.connectedCallback();

		this.consumeContext('umbUsersContext', (usersContext: UmbEditorViewUsersElement) => {
			this._usersContext = usersContext;

			this._usersSubscription?.unsubscribe();
			this._usersSubscription = this._usersContext?.users.subscribe((users: Array<UserItem>) => {
				this._users = users;
			});
		});

		// get user id from url path
		const path = window.location.pathname;
		const pathParts = path.split('/');
		const userKey = pathParts[pathParts.length - 1];

		// get user from users array
		this._user = this._users.find((user: UserItem) => user.key === userKey);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();

		this._usersSubscription?.unsubscribe();
	}

	render() {
		return html`
			<div id="left-column">
				<uui-box>
					<div slot="headline">Profile</div>
					<uui-form-layout-item>
						<uui-label for="email">Email</uui-label>
						<uui-input name="email" readonly value="FIX EMAIL"></uui-input>
					</uui-form-layout-item>
					<uui-form-layout-item>
						<uui-label for="language">Language</uui-label>
						<uui-select name="language" .options=${this._languages}> </uui-select>
					</uui-form-layout-item>
				</uui-box>
				<uui-box>
					<div slot="headline">Assign access</div>
					<div>
						<b>Groups</b>
						<div class="faded-text">Add groups to assign access and permissions</div>
					</div>
				</uui-box>
			</div>
			<div id="right-column">
				<uui-box>
					<div>
						<uui-avatar .name=${this._user?.name || ''}></uui-avatar>
						<uui-button label="Change photo"></uui-button>
						<hr />
						<uui-button look="primary" color="danger" label="Delete User"></uui-button>
					</div>
				</uui-box>
			</div>
		`;
	}
}

export default UmbEditorViewUsersUserDetailsElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-editor-view-users-user-details': UmbEditorViewUsersUserDetailsElement;
	}
}
