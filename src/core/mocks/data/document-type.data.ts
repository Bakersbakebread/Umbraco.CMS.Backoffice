import { UmbEntityData } from './entity.data';
import { createDocumentTypeTreeItem } from './utils';
import { DocumentTypeTreeItem, EntityTreeItem } from '@umbraco-cms/backend-api';

export const data: Array<DocumentTypeTreeItem> = [
	{
		name: 'Document Type 1',
		type: 'document-type',
		hasChildren: false,
		key: 'd81c7957-153c-4b5a-aa6f-b434a4964624',
		isContainer: false,
		parentKey: null,
		icon: '',
	},
	{
		name: 'Document Type 2',
		type: 'document-type',
		hasChildren: false,
		key: 'a99e4018-3ffc-486b-aa76-eecea9593d17',
		isContainer: false,
		parentKey: null,
		icon: '',
	},
];

// Temp mocked database
// TODO: all properties are optional in the server schema. I don't think this is correct.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
class UmbDocumentTypeData extends UmbEntityData<DocumentTypeTreeItem> {
	constructor() {
		super(data);
	}

	getTreeRoot(): Array<EntityTreeItem> {
		const rootItems = this.data.filter((item) => item.parentKey === null);
		return rootItems.map((item) => createDocumentTypeTreeItem(item));
	}

	getTreeItemChildren(key: string): Array<EntityTreeItem> {
		const childItems = this.data.filter((item) => item.parentKey === key);
		return childItems.map((item) => createDocumentTypeTreeItem(item));
	}

	getTreeItem(keys: Array<string>): Array<EntityTreeItem> {
		const items = this.data.filter((item) => keys.includes(item.key ?? ''));
		return items.map((item) => createDocumentTypeTreeItem(item));
	}
}

export const umbDocumentTypeData = new UmbDocumentTypeData();
