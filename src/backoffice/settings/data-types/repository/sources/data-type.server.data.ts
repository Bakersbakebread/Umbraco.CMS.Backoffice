import { RepositoryDetailDataSource } from '@umbraco-cms/repository';
import {
	ProblemDetails,
	DocumentType,
	DataTypeResource,
	DataType,
	DataTypeCreateModel,
	DataTypeUpdateModel,
} from '@umbraco-cms/backend-api';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';
import { tryExecuteAndNotify } from '@umbraco-cms/resources';

/**
 * A data source for the Data Type that fetches data from the server
 * @export
 * @class UmbDataTypeServerDataSource
 * @implements {RepositoryDetailDataSource}
 */
export class UmbDataTypeServerDataSource implements RepositoryDetailDataSource<DocumentType> {
	#host: UmbControllerHostInterface;

	/**
	 * Creates an instance of UmbDataTypeServerDataSource.
	 * @param {UmbControllerHostInterface} host
	 * @memberof UmbDataTypeServerDataSource
	 */
	constructor(host: UmbControllerHostInterface) {
		this.#host = host;
	}

	/**
	 * Fetches a Data Type with the given key from the server
	 * @param {string} key
	 * @return {*}
	 * @memberof UmbDataTypeServerDataSource
	 */
	async get(key: string) {
		if (!key) {
			const error: ProblemDetails = { title: 'Key is missing' };
			return { error };
		}

		return tryExecuteAndNotify(
			this.#host,
			DataTypeResource.getDataTypeByKey({
				key,
			})
		);
	}

	/**
	 * Creates a new Data Type scaffold
	 * @param {(string | null)} parentKey
	 * @return {*}
	 * @memberof UmbDataTypeServerDataSource
	 */
	async createScaffold(parentKey: string | null) {
		const data: DataType = {
			parentKey: parentKey,
		};

		return { data };
	}

	/**
	 * Inserts a new Data Type on the server
	 * @param {Document} dataType
	 * @return {*}
	 * @memberof UmbDataTypeServerDataSource
	 */
	async insert(dataType: DataType) {
		if (!dataType.key) {
			const error: ProblemDetails = { title: 'DataType key is missing' };
			return { error };
		}
		const requestBody: DataTypeCreateModel = { ...dataType };

		// TODO: use resources when end point is ready:
		return tryExecuteAndNotify<DataType>(
			this.#host,
			DataTypeResource.postDataType({
				requestBody,
			})
		);
	}

	/**
	 * Updates a DataType on the server
	 * @param {DataType} DataType
	 * @return {*}
	 * @memberof UmbDataTypeServerDataSource
	 */
	// TODO: Error mistake in this:
	async update(dataType: DataType) {
		if (!dataType.key) {
			const error: ProblemDetails = { title: 'DataType key is missing' };
			return { error };
		}

		const requestBody: DataTypeUpdateModel = { ...dataType };

		// TODO: use resources when end point is ready:
		return tryExecuteAndNotify<DataType>(
			this.#host,
			DataTypeResource.putDataTypeByKey({
				key: dataType.key,
				requestBody,
			})
		);
	}

	/**
	 * Trash a Document on the server
	 * @param {Document} Document
	 * @return {*}
	 * @memberof UmbDataTypeServerDataSource
	 */
	async trash(key: string) {
		if (!key) {
			const error: ProblemDetails = { title: 'DataType key is missing' };
			return { error };
		}

		// TODO: use resources when end point is ready:
		return tryExecuteAndNotify<DataType>(
			this.#host,
			DataTypeResource.deleteDataTypeByKey({
				key,
			})
		);
	}

	/**
	 * Deletes a Data Type on the server
	 * @param {string} key
	 * @return {*}
	 * @memberof UmbDataTypeServerDataSource
	 */
	async delete(key: string) {
		if (!key) {
			const error: ProblemDetails = { title: 'DataType key is missing' };
			return { error };
		}

		// TODO: use resources when end point is ready:
		return tryExecuteAndNotify<DataType>(
			this.#host,
			DataTypeResource.deleteDataTypeByKey({
				key,
			})
		);
	}
}
