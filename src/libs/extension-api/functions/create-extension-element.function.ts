import { hasDefaultExport, hasElementExport, isManifestElementNameType } from '../type-guards/index.js';
import type { HTMLElementConstructor, ManifestElement } from '../types.js';
import { loadExtensionElement } from '../functions/load-extension-element.function.js';

export async function createExtensionElement<ElementType extends HTMLElement>(
	manifest: ManifestElement<ElementType>, defaultElement?: string
): Promise<ElementType | undefined> {
	//TODO: Write tests for these extension options:
	const js = await loadExtensionElement(manifest);

	if (isManifestElementNameType(manifest)) {
		// created by manifest method providing HTMLElement
		return document.createElement(manifest.elementName) as ElementType;
	}

	// TODO: Do we need this except for the default() loader?
	if (js) {
		if (hasElementExport<HTMLElementConstructor<ElementType>>(js)) {
			// Element will be created by default class
			return new js.element();
		}
		if (hasDefaultExport<HTMLElementConstructor<ElementType>>(js)) {
			// Element will be created by default class
			return new js.default();
		}
	}


	if(defaultElement) {
		return document.createElement(defaultElement) as ElementType;
	}

	// If some JS was loaded and manifest did not have a elementName neither it the JS file contain a default export, so we will fail:
	console.error(
		'-- Extension did not succeed creating an element, missing a `element` or `default` export of the JavaScript file or `elementName` in the manifest.',
		manifest
	);
	return undefined;
}
