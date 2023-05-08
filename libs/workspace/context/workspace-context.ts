import { UmbEntityWorkspaceContextInterface } from './workspace-entity-context.interface';
import { UMB_ENTITY_WORKSPACE_CONTEXT, UmbContextBase } from '@umbraco-cms/backoffice/context-api';
import { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller';
import { UmbBooleanState } from '@umbraco-cms/backoffice/observable-api';
import type { UmbEntityBase } from '@umbraco-cms/backoffice/models';

/*

TODO: We need to figure out if we like to keep using same alias for all workspace contexts.
If so we need to align on a interface that all of these implements. otherwise consumers cant trust the workspace-context.
*/
export abstract class UmbWorkspaceContext<T, EntityType extends UmbEntityBase>
	extends UmbContextBase<any>
	implements UmbEntityWorkspaceContextInterface<EntityType>
{
	public repository: T;

	#isNew = new UmbBooleanState(undefined);
	isNew = this.#isNew.asObservable();

	constructor(host: UmbControllerHostElement, repository: T) {
		super(host, UMB_ENTITY_WORKSPACE_CONTEXT);
		this.repository = repository;
	}

	getIsNew() {
		return this.#isNew.getValue();
	}

	setIsNew(isNew: boolean) {
		this.#isNew.next(isNew);
	}

	abstract getEntityId(): string | undefined; // COnsider if this should go away now that we have getUnique()
	abstract getEntityType(): string; // TODO: consider of this should be on the repository because a repo is responsible for one entity type
	abstract getData(): EntityType | undefined;
	abstract save(): Promise<void>;
	abstract destroy(): void;
}
