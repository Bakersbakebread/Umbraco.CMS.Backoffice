import { UMB_DOCUMENT_ENTITY_TYPE } from '../../entity.js';
import { UMB_DOCUMENT_PUBLIC_ACCESS_REPOSITORY_ALIAS } from './repository/manifests.js';
import { UmbDocumentPublicAccessEntityAction } from './public-access.action.js';
import type { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

const entityActions: Array<ManifestTypes> = [
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Document.PublicAccess',
		name: 'Document Permissions Entity Action',
		api: UmbDocumentPublicAccessEntityAction,
		forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE],
		meta: {
			icon: 'icon-lock',
			label: 'Restrict Public Access',
			repositoryAlias: UMB_DOCUMENT_PUBLIC_ACCESS_REPOSITORY_ALIAS,
		},
	},
];

const manifestModals: Array<ManifestTypes> = [
	{
		type: 'modal',
		alias: 'Umb.Modal.PublicAccess',
		name: 'Public Access Modal',
		js: () => import('./modal/public-access-modal.element.js'),
	},
];

export const manifests = [...entityActions, ...manifestModals];
