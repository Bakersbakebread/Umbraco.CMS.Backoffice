import type { UmbBackofficeManifestKind } from '@umbraco-cms/backoffice/extension-registry';

export const manifest: UmbBackofficeManifestKind = {
	type: 'kind',
	alias: 'Umb.Kind.EntityAction.Tree.ReloadChildrenOf',
	matchKind: 'reloadTreeItemChildren',
	matchType: 'entityAction',
	manifest: {
		type: 'entityAction',
		kind: 'reloadTreeItemChildren',
		api: () => import('./reload-tree-item-children.action.js'),
		weight: 100,
		forEntityTypes: [],
		meta: {
			icon: 'icon-refresh',
			label: 'Reload children',
		},
	},
};
