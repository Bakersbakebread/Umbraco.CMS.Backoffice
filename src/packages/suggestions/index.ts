import { manifests as propertyEditorManifests } from './property-editors/manifests';
import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';

import './components';

export const manifests = [...propertyEditorManifests];

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
	extensionRegistry.registerMany(manifests);
};
