import { css, html, LitElement, nothing } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, state } from 'lit/decorators.js';
import { UmbContextConsumerMixin } from '../../../../../core/context';
import { Subscription } from 'rxjs';
import './editor-view-users-table.element';
import './editor-view-users-grid.element';
import './editor-view-users-selection.element';
import { IRoute } from 'router-slot';
import UmbEditorViewUsersElement from './editor-view-users.element';
import { UUIPopoverElement } from '@umbraco-ui/uui';

export type UsersViewType = 'list' | 'grid';
@customElement('umb-editor-view-users-list')
export class UmbEditorViewUsersListElement extends UmbContextConsumerMixin(LitElement) {
	static styles = [
		UUITextStyles,
		css`
			#sticky-top {
				position: sticky;
				top: -1px;
				z-index: 1;
				box-shadow: 0 1px 3px rgba(0, 0, 0, 0), 0 1px 2px rgba(0, 0, 0, 0);
				transition: 250ms box-shadow ease-in-out;
			}

			#sticky-top.header-shadow {
				box-shadow: var(--uui-shadow-depth-2);
			}

			#user-list-top-bar {
				padding: var(--uui-size-space-4) var(--uui-size-space-6);
				background-color: var(--uui-color-surface-alt);
				display: flex;
				justify-content: space-between;
				white-space: nowrap;
				gap: 16px;
				align-items: center;
			}
			#user-list {
				padding: var(--uui-size-space-6);
				padding-top: var(--uui-size-space-2);
			}
			#input-search {
				width: 100%;
			}

			uui-popover {
				width: unset;
			}

			.filter-dropdown {
				display: flex;
				gap: 8px;
				flex-direction: column;
				background-color: var(--uui-color-surface);
				padding: var(--uui-size-space-4);
				border-radius: var(--uui-size-border-radius);
				box-shadow: var(--uui-shadow-depth-2);
				width: fit-content;
			}
		`,
	];

	@state()
	private _viewType: UsersViewType = 'grid';

	@state()
	private _selection: Array<string> = [];

	private _usersContext?: UmbEditorViewUsersElement;
	private _selectionSubscription?: Subscription;

	constructor() {
		super();

		this.setupHeaderIntersectionObserver();
	}

	connectedCallback(): void {
		super.connectedCallback();

		this.consumeContext('umbUsersContext', (usersContext: UmbEditorViewUsersElement) => {
			this._usersContext = usersContext;

			this._selectionSubscription?.unsubscribe();
			this._selectionSubscription = this._usersContext?.selection.subscribe((selection: Array<string>) => {
				this._selection = selection;
			});
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();

		this._selectionSubscription?.unsubscribe();
	}

	public setupHeaderIntersectionObserver() {
		requestAnimationFrame(() => {
			const el = this.shadowRoot?.querySelector('#sticky-top');

			if (el) {
				const options = { threshold: [1] };
				const callback = (entries: IntersectionObserverEntry[]) =>
					entries[0].target.classList.toggle('header-shadow', entries[0].intersectionRatio < 1);
				const observer = new IntersectionObserver(callback, options);

				observer.observe(el);
			}
		});
	}

	private _toggleViewType() {
		this._viewType = this._viewType === 'list' ? 'grid' : 'list';
	}

	private _renderViewType() {
		switch (this._viewType) {
			case 'list':
				return html`<umb-editor-view-users-table></umb-editor-view-users-table>`;
			case 'grid':
				return html`<umb-editor-view-users-grid></umb-editor-view-users-grid>`;
			default:
				return html`<umb-editor-view-users-grid></umb-editor-view-users-grid>`;
		}
	}

	private _renderSelection() {
		if (this._selection.length === 0) return nothing;

		return html`<umb-editor-view-users-selection></umb-editor-view-users-selection>`;
	}

	@state()
	private _routes: IRoute[] = [
		{
			path: 'list',
			component: () => import('./editor-view-users-table.element'),
		},
		{
			path: 'details/:key',
			component: () => import('./editor-view-users-user-details.element'),
		},
	];

	private _handleTogglePopover(event: PointerEvent) {
		const composedPath = event.composedPath();

		const popover = composedPath.find((el) => el instanceof UUIPopoverElement) as UUIPopoverElement;
		if (popover) {
			popover.open = !popover.open;
		}
	}

	render() {
		return html`
			<div id="sticky-top">
				<div id="user-list-top-bar">
					<uui-button label="Invite user" look="outline"></uui-button>
					<uui-input label="search" id="input-search"></uui-input>
					<div>
						<uui-popover margin="8">
							<uui-button @click=${this._handleTogglePopover} slot="trigger" label="status">
								Status: <b>All</b>
							</uui-button>
							<div slot="popover" class="filter-dropdown">
								<uui-checkbox label="Active"></uui-checkbox>
								<uui-checkbox label="Inactive"></uui-checkbox>
								<uui-checkbox label="Invited"></uui-checkbox>
								<uui-checkbox label="Disabled"></uui-checkbox>
							</div>
						</uui-popover>
						<uui-popover margin="8">
							<uui-button @click=${this._handleTogglePopover} slot="trigger" label="groups">
								Groups: <b>All</b>
							</uui-button>
							<div slot="popover" class="filter-dropdown">
								<uui-checkbox label="Active"></uui-checkbox>
								<uui-checkbox label="Inactive"></uui-checkbox>
								<uui-checkbox label="Invited"></uui-checkbox>
								<uui-checkbox label="Disabled"></uui-checkbox>
							</div>
						</uui-popover>
						<uui-popover margin="8">
							<uui-button @click=${this._handleTogglePopover} slot="trigger" label="order by">
								Order by: <b>Name (A-Z)</b>
							</uui-button>
							<div slot="popover" class="filter-dropdown">
								<uui-checkbox label="Active"></uui-checkbox>
								<uui-checkbox label="Inactive"></uui-checkbox>
								<uui-checkbox label="Invited"></uui-checkbox>
								<uui-checkbox label="Disabled"></uui-checkbox>
							</div>
						</uui-popover>
						<uui-button
							label="view toggle"
							@click=${this._toggleViewType}
							look="${this._viewType === 'grid' ? 'outline' : 'primary'}"
							compact>
							<uui-icon name="settings"></uui-icon>
						</uui-button>
					</div>
				</div>

				${this._renderSelection()}
			</div>

			<router-slot .routes=${this._routes}></router-slot>

			<div id="user-list">${this._renderViewType()}</div>
		`;
	}
}

export default UmbEditorViewUsersListElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-editor-view-users-list': UmbEditorViewUsersListElement;
	}
}
