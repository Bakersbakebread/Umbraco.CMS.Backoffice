import type { UmbItemDataSource } from '@umbraco-cms/backoffice/repository';
import { DocumentItemResponseModel, DocumentResource } from '@umbraco-cms/backoffice/backend-api';
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

/**
 * A data source for Document items that fetches data from the server
 * @export
 * @class UmbDocumentItemServerDataSource
 * @implements {DocumentItemDataSource}
 */
export class UmbDocumentItemServerDataSource implements UmbItemDataSource<DocumentItemResponseModel> {
	#host: UmbControllerHost;

	/**
	 * Creates an instance of UmbDocumentItemServerDataSource.
	 * @param {UmbControllerHost} host
	 * @memberof UmbDocumentItemServerDataSource
	 */
	constructor(host: UmbControllerHost) {
		this.#host = host;
	}

	/**
	 * Fetches the items for the given ids from the server
	 * @param {Array<string>} ids
	 * @memberof UmbDocumentItemServerDataSource
	 */
	async getItems(ids: Array<string>) {
		if (!ids) throw new Error('Ids are missing');
		return tryExecuteAndNotify(
			this.#host,
			DocumentResource.getDocumentItem({
				id: ids,
			}),
		);
	}
}
