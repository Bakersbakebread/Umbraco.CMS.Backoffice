import { type ManifestApi } from '@umbraco-cms/backoffice/extension-api';
import { UmbItemStore, UmbStoreBase } from '@umbraco-cms/backoffice/store';
import { type UmbTreeStore } from '@umbraco-cms/backoffice/tree';

export interface ManifestStore extends ManifestApi<UmbStoreBase> {
	type: 'store';
}

export interface ManifestTreeStore extends ManifestApi<UmbTreeStore> {
	type: 'treeStore';
}

export interface ManifestItemStore extends ManifestApi<UmbItemStore> {
	type: 'itemStore';
}
