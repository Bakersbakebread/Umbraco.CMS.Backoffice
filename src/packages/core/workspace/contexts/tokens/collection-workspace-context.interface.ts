import type { UmbEntityWorkspaceContextInterface } from './entity-workspace-context.interface.js';
import type { Observable } from '@umbraco-cms/backoffice/external/rxjs';
import type { UmbContentTypeModel, UmbContentTypeStructureManager } from '@umbraco-cms/backoffice/content-type';

export interface UmbCollectionWorkspaceContextInterface<T extends UmbContentTypeModel>
	extends UmbEntityWorkspaceContextInterface {
	contentTypeHasCollection: Observable<boolean>;
	getCollectionAlias(): string;
	structure: UmbContentTypeStructureManager<T>;
}

/**
 * @deprecated Use UmbCollectionWorkspaceContextInterface instead — Will be removed before RC.
 * TODO: Delete before RC.
 */
export interface UmbWorkspaceCollectionContextInterface<T extends UmbContentTypeModel>
	extends UmbCollectionWorkspaceContextInterface<T> {}
