import { UMB_COLLECTION_ALIAS_CONDITION } from '@umbraco-cms/backoffice/collection';
import type { ManifestCollectionView } from '@umbraco-cms/backoffice/extension-registry';

export const UMB_MEDIA_TABLE_COLLECTION_VIEW_ALIAS = 'Umb.CollectionView.Media.Table';

const tableViewManifest: ManifestCollectionView = {
	type: 'collectionView',
	alias: UMB_MEDIA_TABLE_COLLECTION_VIEW_ALIAS,
	name: 'Media Table Collection View',
	element: () => import('./table/media-table-collection-view.element.js'),
	weight: 201,
	meta: {
		label: 'Table',
		icon: 'icon-list',
		pathName: 'table',
	},
	conditions: [
		{
			alias: UMB_COLLECTION_ALIAS_CONDITION,
			match: 'Umb.Collection.Media',
		},
	],
};

export const manifests = [tableViewManifest];
