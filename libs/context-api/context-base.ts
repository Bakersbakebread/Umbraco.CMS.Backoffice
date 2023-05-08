import { UmbContextToken } from './token';
import { UmbContextProviderController } from './provide/context-provider.controller';
import { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller';

export class UmbContextBase<T> {
	public host: UmbControllerHostElement;

	constructor(host: UmbControllerHostElement, contextAlias: string | UmbContextToken<T>) {
		this.host = host;
		const alias = typeof contextAlias === 'string' ? contextAlias : contextAlias.toString();
		new UmbContextProviderController(this.host, alias, this);
	}
}
