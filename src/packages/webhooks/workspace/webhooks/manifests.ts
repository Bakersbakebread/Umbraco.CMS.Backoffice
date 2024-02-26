import type {
	ManifestWorkspace,
	ManifestWorkspaceAction,
	ManifestWorkspaceView,
} from '@umbraco-cms/backoffice/extension-registry';

const workspaceAlias = 'Umb.Workspace.Webhooks';

const workspace: ManifestWorkspace = {
	type: 'workspace',
	alias: workspaceAlias,
	name: 'Webhook Root Workspace',
	js: () => import('./webhook-root-workspace.element.js'),
	meta: {
		entityType: 'webhooks',
	},
};

const workspaceViews: Array<ManifestWorkspaceView> = [
	{
		type: 'workspaceView',
		alias: 'Umb.WorkspaceView.Webhooks.Overview',
		name: 'Webhooks Root Workspace Overview View',
		js: () => import('../views/overview/index.js'),
		weight: 300,
		meta: {
			label: 'Overview',
			pathname: 'overview',
			icon: 'icon-webhook',
		},
		conditions: [
			{
				alias: 'Umb.Condition.WorkspaceAlias',
				match: workspace.alias,
			},
		],
	},
	{
		type: 'workspaceView',
		alias: 'Umb.WorkspaceView.LogViewer.Search',
		name: 'LogViewer Root Workspace Search View',
		js: () => import('../views/logs/index.js'),
		weight: 200,
		meta: {
			label: 'Logs',
			pathname: 'logs',
			icon: 'icon-box-alt',
		},
		conditions: [
			{
				alias: 'Umb.Condition.WorkspaceAlias',
				match: workspace.alias,
			},
		],
	},
];

const workspaceActions: Array<ManifestWorkspaceAction> = [];

export const manifests = [workspace, ...workspaceViews, ...workspaceActions];
