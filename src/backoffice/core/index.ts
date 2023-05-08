import { manifests as componentManifests } from './components';
import { manifests as propertyActionManifests } from './property-actions/manifests';
import { manifests as propertyEditorManifests } from './property-editors/manifests';
import { manifests as modalManifests } from './modals/manifests';

import { UmbBackofficeNotificationContainerElement } from './components/backoffice-frame/backoffice-notification-container.element';
import { UmbBackofficeModalContainerElement } from './components/backoffice-frame/backoffice-modal-container.element';

import { UMB_NOTIFICATION_CONTEXT_TOKEN, UmbNotificationContext } from '@umbraco-cms/backoffice/notification';
import { UmbModalContext } from '@umbraco-cms/backoffice/modal';
import type { UmbEntrypointOnInit } from '@umbraco-cms/backoffice/extensions-api';

import './notification';
import { UmbContextProviderController } from '@umbraco-cms/backoffice/context-api';

export const manifests = [
	...componentManifests,
	...propertyActionManifests,
	...propertyEditorManifests,
	...modalManifests,
];

export const onInit: UmbEntrypointOnInit = (host, extensionRegistry) => {
	extensionRegistry.registerMany(manifests);

	/* TODO: there seems to be an issue with lazy context providers.
	If two are provided after the elements are appended they don't work.
	It isn't a problem if the UmbContextProviderController is used directly in this file. */
	new UmbNotificationContext(host);
	new UmbModalContext(host);

	const notificationContainerElement = new UmbBackofficeNotificationContainerElement();
	host.appendChild(notificationContainerElement);

	const modalContainerElement = new UmbBackofficeModalContainerElement();
	host.appendChild(modalContainerElement);
};
