import { UMB_STYLESHEET_ITEM_REPOSITORY_ALIAS } from '../../repository/index.js';
import type { UmbStylesheetItemModel } from '../../types.js';
import { UMB_STYLESHEET_PICKER_MODAL } from './stylesheet-picker-modal.token.js';
import { UmbPickerInputContext } from '@umbraco-cms/backoffice/picker-input';
import type { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';

export class UmbStylesheetPickerContext extends UmbPickerInputContext<UmbStylesheetItemModel> {
	constructor(host: UmbControllerHostElement) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// TODO: Item and tree item types collide
		super(host, UMB_STYLESHEET_ITEM_REPOSITORY_ALIAS, UMB_STYLESHEET_PICKER_MODAL, (item) => item.unique);
	}
}
