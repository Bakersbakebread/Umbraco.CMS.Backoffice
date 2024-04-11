import { MediaTypeService } from '@umbraco-cms/backoffice/external/backend-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import type { UmbMoveToDataSource, UmbMoveToRequestArgs } from '@umbraco-cms/backoffice/repository';

/**
 * Move Media Type Server Data Source
 * @export
 * @class UmbMoveMediaTypeServerDataSource
 */
export class UmbMoveMediaTypeServerDataSource implements UmbMoveToDataSource {
	#host: UmbControllerHost;

	/**
	 * Creates an instance of UmbMoveMediaTypeServerDataSource.
	 * @param {UmbControllerHost} host
	 * @memberof UmbMoveMediaTypeServerDataSource
	 */
	constructor(host: UmbControllerHost) {
		this.#host = host;
	}

	/**
	 * Move an item for the given id to the target unique
	 * @param {string} unique
	 * @param {(string | null)} targetUnique
	 * @return {*}
	 * @memberof UmbMoveMediaTypeServerDataSource
	 */
	async move(args: UmbMoveToRequestArgs) {
		if (!args.unique) throw new Error('Unique is missing');
		if (args.destination.unique === undefined) throw new Error('Destination unique is missing');

		return tryExecuteAndNotify(
			this.#host,
			MediaTypeService.putMediaTypeByIdMove({
				id: args.unique,
				requestBody: {
					target: args.destination.unique ? { id: args.destination.unique } : null,
				},
			}),
		);
	}
}
