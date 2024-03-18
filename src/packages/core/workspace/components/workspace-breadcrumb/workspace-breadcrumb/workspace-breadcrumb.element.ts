import { html, customElement, state, ifDefined } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import type { UmbUniqueTreeItemModel } from '@umbraco-cms/backoffice/tree';
import { UMB_SECTION_CONTEXT } from '@umbraco-cms/backoffice/section';

@customElement('umb-workspace-breadcrumb')
export class UmbWorkspaceBreadcrumbElement extends UmbLitElement {
	// TODO: figure out the correct context type
	#workspaceContext?: any;

	@state()
	_isNew = false;

	@state()
	_name: string = '';

	@state()
	_structure: any[] = [];

	#sectionContext?: any;

	constructor() {
		super();
		this.consumeContext(UMB_WORKSPACE_CONTEXT, (instance) => {
			this.#workspaceContext = instance as any;
			this.observe(this.#workspaceContext.name, (value) => (this._name = value), 'breadcrumbWorkspaceNameObserver');
		});

		this.consumeContext('UmbNavigationStructureWorkspaceContext', (instance) => {
			this.observe(instance.structure, (value) => (this._structure = value), 'navigationStructureObserver');
		});

		this.consumeContext(UMB_SECTION_CONTEXT, (instance) => {
			this.#sectionContext = instance;
		});
	}

	#getHref(structureItem: UmbUniqueTreeItemModel) {
		const workspaceBasePath = `section/${this.#sectionContext?.getPathname()}/workspace/${structureItem.entityType}/edit`;
		return structureItem.isFolder ? undefined : `${workspaceBasePath}/${structureItem.unique}`;
	}

	render() {
		return html`
			<uui-breadcrumbs>
				${this._structure?.map(
					(structureItem) =>
						html`<uui-breadcrumb-item href="${ifDefined(this.#getHref(structureItem))}"
							>${structureItem.name}</uui-breadcrumb-item
						>`,
				)}
			</uui-breadcrumbs>
		`;
	}

	static styles = [UmbTextStyles];
}

export default UmbWorkspaceBreadcrumbElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-workspace-breadcrumb': UmbWorkspaceBreadcrumbElement;
	}
}
