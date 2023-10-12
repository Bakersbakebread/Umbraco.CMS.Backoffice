import {
	CHANGE_USER_PASSWORD_REPOSITORY_ALIAS,
	DISABLE_USER_REPOSITORY_ALIAS,
	ENABLE_USER_REPOSITORY_ALIAS,
	USER_REPOSITORY_ALIAS,
} from '../repository/manifests.js';
import { UMB_USER_ENTITY_TYPE } from '../index.js';
import { UmbDisableUserEntityAction } from './disable/disable-user.action.js';
import { UmbEnableUserEntityAction } from './enable/enable-user.action.js';
import { UmbChangeUserPasswordEntityAction } from './change-password/change-user-password.action.js';
import { UmbUnlockUserEntityAction } from './unlock/unlock-user.action.js';
import { UmbDeleteEntityAction } from '@umbraco-cms/backoffice/entity-action';
import { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

const entityActions: Array<ManifestTypes> = [
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.User.Delete',
		name: 'Delete User Entity Action',
		weight: 900,
		api: UmbDeleteEntityAction,
		meta: {
			icon: 'umb:trash',
			label: 'Delete',
			repositoryAlias: USER_REPOSITORY_ALIAS,
			entityTypes: [UMB_USER_ENTITY_TYPE],
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.User.Enable',
		name: 'Enable User Entity Action',
		weight: 800,
		api: UmbEnableUserEntityAction,
		meta: {
			icon: 'umb:check',
			label: 'Enable',
			repositoryAlias: ENABLE_USER_REPOSITORY_ALIAS,
			entityTypes: [UMB_USER_ENTITY_TYPE],
		},
		conditions: [
			{
				alias: 'Umb.Condition.User.AllowEnableAction',
			},
		],
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.User.Disable',
		name: 'Disable User Entity Action',
		weight: 700,
		api: UmbDisableUserEntityAction,
		meta: {
			icon: 'umb:block',
			label: 'Disable',
			repositoryAlias: DISABLE_USER_REPOSITORY_ALIAS,
			entityTypes: [UMB_USER_ENTITY_TYPE],
		},
		conditions: [
			{
				alias: 'Umb.Condition.User.AllowDisableAction',
			},
		],
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.User.ChangePassword',
		name: 'Change User Password Entity Action',
		weight: 600,
		api: UmbChangeUserPasswordEntityAction,
		meta: {
			icon: 'umb:key',
			label: 'Change Password',
			repositoryAlias: CHANGE_USER_PASSWORD_REPOSITORY_ALIAS,
			entityTypes: [UMB_USER_ENTITY_TYPE],
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.User.Unlock',
		name: 'Unlock User Entity Action',
		weight: 600,
		api: UmbUnlockUserEntityAction,
		meta: {
			icon: 'umb:key',
			label: 'Change Password',
			repositoryAlias: CHANGE_USER_PASSWORD_REPOSITORY_ALIAS,
			entityTypes: [UMB_USER_ENTITY_TYPE],
		},
	},
];

export const manifests = [...entityActions];
