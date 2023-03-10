import { customElement, property } from 'lit/decorators.js';
import { UmbModalHandler } from '..';
import { UmbLitElement } from '@umbraco-cms/element';

@customElement('umb-modal-element')
export class UmbModalLayoutElement<UmbModalData = void> extends UmbLitElement {
	@property({ attribute: false })
	modalHandler?: UmbModalHandler;

	@property({ type: Object })
	data?: UmbModalData;
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-modal-element': UmbModalLayoutElement<unknown>;
	}
}
