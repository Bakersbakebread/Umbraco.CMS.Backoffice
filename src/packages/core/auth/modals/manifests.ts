import type { ManifestModal } from '@umbraco-cms/backoffice/extension-registry';

export const manifests: Array<ManifestModal> = [
	{
		type: 'modal',
		alias: 'Umb.Modal.AppAuth',
		name: 'Umb App Auth Modal',
		element: () => import('./umb-app-auth-modal.element.js'),
	},
];
