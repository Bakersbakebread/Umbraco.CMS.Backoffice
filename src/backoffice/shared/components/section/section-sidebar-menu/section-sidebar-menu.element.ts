import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ManifestKind, ManifestMenu, ManifestMenuSectionSidebarApp } from '@umbraco-cms/extensions-registry';
import { UmbLitElement } from '@umbraco-cms/element';

import '../../menu/menu.element';
import { umbExtensionsRegistry } from '@umbraco-cms/extensions-api';

const manifest: ManifestKind = {
	type: 'kind',
	matchKind: 'menuSectionSidebarApp',
	matchType: 'sectionSidebarApp',
	manifest: {
		type: 'sectionSidebarApp',
		elementName: 'umb-section-sidebar-menu',
	},
};
umbExtensionsRegistry.register(manifest);

@customElement('umb-section-sidebar-menu')
export class UmbSectionSidebarMenuElement extends UmbLitElement {
	static styles = [
		UUITextStyles,
		css`
			h3 {
				padding: var(--uui-size-4) var(--uui-size-8);
			}
		`,
	];

	@property()
	manifest?: ManifestMenuSectionSidebarApp;

	render() {
		// TODO: link to dashboards when clicking on the menu item header
		return html` <h3>${this.manifest?.meta.label}</h3>
			<umb-extension-slot
				type="menu"
				.filter=${(menu: ManifestMenu) => menu.alias === this.manifest!.meta.menu}
				default-element="umb-menu"></umb-extension-slot>`;
	}
}

export default UmbSectionSidebarMenuElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-section-sidebar-menu': UmbSectionSidebarMenuElement;
	}
}
