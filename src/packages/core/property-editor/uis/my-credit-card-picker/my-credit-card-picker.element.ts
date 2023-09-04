// TODO: Do not use Umb in the name here:
import { UmbCreditCardElement } from './my-credit-card.element.js';
import { html, customElement, property, state, css, LitElement, repeat } from '@umbraco-cms/backoffice/external/lit';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { UMB_VARIANT_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UmbPropertyEditorExtensionElement } from '@umbraco-cms/backoffice/extension-registry';
import { UmbVariantId } from '@umbraco-cms/backoffice/variant';
import { UUITextStyles } from '@umbraco-cms/backoffice/external/uui';
import type { UmbDataTypeConfigCollection } from '@umbraco-cms/backoffice/components';

import './my-credit-card.element.js';

@customElement('umb-credit-card-picker')
export class UmbCreditCardPickerElement extends UmbElementMixin(LitElement) implements UmbPropertyEditorExtensionElement {

	@property()
	value: string | undefined;

	@property({ attribute: false })
	public config?: UmbDataTypeConfigCollection;

	@state()
	private _filteredCards:any[] = [];

	#variantId: UmbVariantId | undefined;

	#allCards: any[] = [];

	constructor() {
		super();

		this.consumeContext(UMB_VARIANT_CONTEXT, (context) => {
			this.#variantId = context.getVariantId();
			this.filterCards();
		});


		tryExecuteAndNotify(this,
			fetch(`/App_Plugins/credit-cards.json`)
			//.then((res) => res.json())
		).then(async (response) => {
			if(response.data) {

				const json = await response.data.json();
				this.#allCards = json.availableCards;
				this.filterCards();
			}
		});


	}


	private filterCards() {
		if(!this.#variantId || !this.#allCards) return;
		this._filteredCards = this.#allCards.filter(card => card.cultures.includes(this.#variantId!.culture || 'invariant'));
	}


	private _onCardClicked = (e:MouseEvent) => {
		const target = e.target as UmbCreditCardElement;
		this.value = target.value;
		this.dispatchEvent(new CustomEvent('property-value-change'));
	};

	render() {
		return repeat(this._filteredCards,
			(card) => card.value,
			(card) =>
				html`
					<my-credit-card @selected=${this._onCardClicked} name=${card.name} value=${card.value} ?selected=${card.value === this.value}>
					</my-credit-card>
				`
			);
	}

	static styles = [UUITextStyles, css`
		:host {
			display: flex;
			flex-direction: row;
			gap: var(--uui-size-space-4)
		}
	`];
}

export default UmbCreditCardPickerElement;
