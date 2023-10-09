import { hasApiExport, hasDefaultExport, isManifestApiConstructorType } from './type-guards/index.js';
import type { ManifestApi, ClassConstructor, ManifestElementAndApi } from './types.js';
import { loadExtensionApi } from './load-extension-api.function.js';

//TODO: Write tests for this method:
export async function createExtensionApi<ApiType = unknown>(
	manifest: ManifestApi<ApiType> | ManifestElementAndApi<any, ApiType>,
	constructorArguments: unknown[]
): Promise<ApiType | undefined> {
	const js = await loadExtensionApi(manifest);

	if (isManifestApiConstructorType<ApiType>(manifest)) {
		return new manifest.api(...constructorArguments);
	}

	if (js) {
		if (hasApiExport<ClassConstructor<ApiType>>(js)) {
			return new js.api(...constructorArguments);
		}
		if (hasDefaultExport<ClassConstructor<ApiType>>(js)) {
			return new js.default(...constructorArguments);
		}

		console.error(
			'-- Extension did not succeed creating an api class instance, missing a default export of the served JavaScript file',
			manifest
		);

		return undefined;
	}

	console.error(
		'-- Extension did not succeed creating an api class instance, missing a default export or `api` in the manifest.',
		manifest
	);
	return undefined;
}
