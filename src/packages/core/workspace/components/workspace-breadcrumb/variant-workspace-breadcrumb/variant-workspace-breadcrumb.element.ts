import { html, customElement, state, ifDefined } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import type { UmbVariantableWorkspaceContextInterface } from '@umbraco-cms/backoffice/workspace';
import { UMB_VARIANT_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import type { UmbVariantModel } from '@umbraco-cms/backoffice/variant';
import { UmbVariantId } from '@umbraco-cms/backoffice/variant';
import type { UmbAppLanguageContext } from '@umbraco-cms/backoffice/language';
import { UMB_APP_LANGUAGE_CONTEXT } from '@umbraco-cms/backoffice/language';
import { UMB_SECTION_CONTEXT } from '@umbraco-cms/backoffice/section';

// This is interface kept internal on purpose until we know if there are other use cases for this
interface UmbTreeItemWithVariantsModel {
	unique: string;
	variants: Array<{
		name: string;
		culture: string | null;
		segment: string | null;
	}>;
}

@customElement('umb-variant-workspace-breadcrumb')
export class UmbVariantWorkspaceBreadcrumbElement extends UmbLitElement {
	#workspaceContext?: UmbVariantableWorkspaceContextInterface<UmbVariantModel>;
	#appLanguageContext?: UmbAppLanguageContext;
	#structureContext?: any;

	@state()
	_name: string = '';

	@state()
	_structure: any[] = [];

	@state()
	_workspaceActiveVariantId?: UmbVariantId;

	@state()
	_appDefaultCulture?: string;

	#sectionContext?: any;

	constructor() {
		super();

		this.consumeContext(UMB_APP_LANGUAGE_CONTEXT, (instance) => {
			this.#appLanguageContext = instance;
			this.#observeDefaultCulture();
		});

		this.consumeContext(UMB_VARIANT_WORKSPACE_CONTEXT, (instance) => {
			this.#workspaceContext = instance;
			this.#observeWorkspaceActiveVariant();
		});

		this.consumeContext('UmbMenuStructureWorkspaceContext', (instance) => {
			if (!instance) return;
			this.#structureContext = instance;
			this.#observeAncestors();
		});

		this.consumeContext(UMB_SECTION_CONTEXT, (instance) => {
			this.#sectionContext = instance;
		});
	}

	#observeAncestors() {
		this.observe(this.#structureContext.structure, (value) => {
			this._structure = value;
		});
	}

	#observeDefaultCulture() {
		this.observe(this.#appLanguageContext!.appDefaultLanguage, (value) => {
			this._appDefaultCulture = value?.unique;
		});
	}

	#observeWorkspaceActiveVariant() {
		this.observe(
			this.#workspaceContext?.splitView.activeVariantsInfo,
			(value) => {
				if (!value) return;
				this._workspaceActiveVariantId = UmbVariantId.Create(value[0]);
				this.#observeActiveVariantName();
			},

			'breadcrumbWorkspaceActiveVariantObserver',
		);
	}

	#observeActiveVariantName() {
		this.observe(
			this.#workspaceContext?.name(this._workspaceActiveVariantId),
			(value) => (this._name = value || ''),
			'breadcrumbWorkspaceNameObserver',
		);
	}

	// TODO: we should move the fallback name logic to a helper class. It will be used in multiple places
	#getItemVariantName(structureItem: UmbTreeItemWithVariantsModel) {
		const fallbackName =
			structureItem.variants.find((variant) => variant.culture === this._appDefaultCulture)?.name ??
			structureItem.variants[0].name ??
			'Unknown';
		const name = structureItem.variants.find((variant) => this._workspaceActiveVariantId?.compare(variant))?.name;
		return name ?? `(${fallbackName})`;
	}

	#getHref(structureItem: any) {
		const workspaceBasePath = `section/${this.#sectionContext?.getPathname()}/workspace/${structureItem.entityType}/edit`;
		return structureItem.isFolder
			? undefined
			: `${workspaceBasePath}/${structureItem.unique}/${this._workspaceActiveVariantId?.culture}`;
	}

	render() {
		return html`
			<uui-breadcrumbs>
				${this._structure.map(
					(structureItem) =>
						html`<uui-breadcrumb-item href="${ifDefined(this.#getHref(structureItem))}"
							>${this.#getItemVariantName(structureItem)}</uui-breadcrumb-item
						>`,
				)}
			</uui-breadcrumbs>
		`;
	}

	static styles = [UmbTextStyles];
}

export default UmbVariantWorkspaceBreadcrumbElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-variant-workspace-breadcrumb': UmbVariantWorkspaceBreadcrumbElement;
	}
}
