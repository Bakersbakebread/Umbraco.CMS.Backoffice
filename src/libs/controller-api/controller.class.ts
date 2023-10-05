import { UmbClassMixin } from './class-api/class.mixin.js';
import type { UmbControllerHost } from './controller-host.interface.js';
import type { UmbController } from './controller.interface.js';

/**
 * This mixin enables a web-component to host controllers.
 * This enables controllers to be added to the life cycle of this element.
 *
 */
export abstract class UmbBaseController extends UmbClassMixin(class {}) implements UmbController {
	constructor(host: UmbControllerHost, controllerAlias?: UmbController['controllerAlias']) {
		super(host, controllerAlias);
		this._host.addController(this);
	}

	public destroy() {
		if (this._host) {
			this._host.removeController(this);
		}
		//delete this.host;
		super.destroy();
	}
}
