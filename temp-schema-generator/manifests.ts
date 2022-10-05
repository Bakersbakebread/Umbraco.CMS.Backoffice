import { body, defaultResponse, endpoint, response } from '@airtasker/spot';

import { ProblemDetails } from './models';
import { PropertyEditorConfig } from './property-editors';

@endpoint({ method: 'GET', path: '/manifests' })
export class Manifests {
	@response({ status: 200 })
	response(@body body: ManifestsResponse) {}

	@defaultResponse
	default(@body body: ProblemDetails) {}
}

@endpoint({ method: 'GET', path: '/manifests/packages' })
export class ManifestsPackages {
	@response({ status: 200 })
	response(@body body: {}) {}

	@defaultResponse
	default(@body body: ProblemDetails) {}
}

@endpoint({ method: 'GET', path: '/manifests/packages/installed' })
export class ManifestsPackagesInstalled {
	@response({ status: 200 })
	response(@body body: ManifestsPackagesInstalledResponse) {}

	@defaultResponse
	default(@body body: ProblemDetails) {}
}

export type Manifest =
	| IManifestSection
	| IManifestTree
	| IManifestEditor
	| IManifestEditorAction
	| IManifestEditorView
	| IManifestTreeItemAction
	| IManifestPropertyEditorUI
	| IManifestDashboard
	| IManifestPropertyAction
	| IManifestPackageView
	| IManifestEntrypoint
	| IManifestCustom;

export type ManifestStandardTypes =
	| 'section'
	| 'tree'
	| 'editor'
	| 'editorView'
	| 'editorAction'
	| 'treeItemAction'
	| 'propertyEditorUI'
	| 'dashboard'
	| 'propertyAction'
	| 'packageView'
	| 'entrypoint'
	;

export interface ManifestsResponse {
	manifests: Manifest[];
}

export interface ManifestsPackagesInstalledResponse {
	packages: PackageInstalled[];
}

export interface PackageInstalled {
	id: string;
	name: string;
	alias: string;
	version: string;
	hasMigrations: boolean;
	hasPendingMigrations: boolean;
	plans: {}[];
}

export interface IManifest {
	type: string;
	alias: string;
	name: string;
}

export interface MetaSection {
	label: string;
	pathname: string;
	weight: number;
}

export interface MetaTree {
	weight: number;
	sections: Array<string>;
}

export interface MetaEditor {
	entityType: string;
}

export interface MetaTreeItemAction {
	trees: Array<string>;
	label: string;
	icon: string;
	weight: number;
}
export interface MetaPropertyEditorUI {
	label: string;
	propertyEditor: string;
	icon: string;
	group: string;
	config?: PropertyEditorConfig;
}

export interface MetaDashboard {
	sections: string[];
	pathname: string;
	weight: number;
	label?: string;
}

export interface MetaEditorView {
	editors: string[];
	pathname: string;
	weight: number;
	label: string;
	icon: string;
}

export interface MetaPropertyAction {
	propertyEditors: string[];
}

export interface MetaPackageView {
	packageAlias: string;
}

export interface IManifestCustom extends IManifest {
	type: 'custom';
	meta?: {};
}

export interface IManifestElement extends IManifest {
	type: ManifestStandardTypes;
	js?: string;
	elementName?: string;
	meta?: {};
}

export interface IManifestSection extends IManifestElement {
	type: 'section';
	meta: MetaSection;
}

export interface IManifestEditorAction extends IManifestElement {
	type: 'editorAction';
	meta: MetaEditorAction;
}

export interface MetaEditorAction {
	editors: Array<string>;
}


export interface IManifestTree extends IManifestElement {
	type: 'tree';
	meta: MetaTree;
}

export interface IManifestEditor extends IManifestElement {
	type: 'editor';
	meta: MetaEditor;
}

export interface IManifestTreeItemAction extends IManifestElement {
	type: 'treeItemAction';
	meta: MetaTreeItemAction;
}

export interface IManifestPropertyEditorUI extends IManifestElement {
	type: 'propertyEditorUI';
	meta: MetaPropertyEditorUI;
}

export interface IManifestDashboard extends IManifestElement {
	type: 'dashboard';
	meta: MetaDashboard;
}

export interface IManifestEditorView extends IManifestElement {
	type: 'editorView';
	meta: MetaEditorView;
}

export interface IManifestPropertyAction extends IManifestElement {
	type: 'propertyAction';
	meta: MetaPropertyAction;
}

export interface IManifestPackageView extends IManifestElement {
	type: 'packageView';
	meta: MetaPackageView;
}

export interface IManifestEntrypoint extends IManifest {
	type: 'entrypoint';
	js: string;
}
