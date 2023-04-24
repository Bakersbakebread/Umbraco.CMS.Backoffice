import { expect, fixture, html } from '@open-wc/testing';
import { UmbColorInputElement } from './color-input.element';
import { defaultA11yConfig } from '@umbraco-cms/internal/test-utils';
describe('UmbColorInputElement', () => {
	let element: UmbColorInputElement;

	beforeEach(async () => {
		element = await fixture(html` <umb-color-input></umb-color-input> `);
	});

	it('is defined with its own instance', () => {
		expect(element).to.be.instanceOf(UmbColorInputElement);
	});

	it('passes the a11y audit', async () => {
		await expect(element).shadowDom.to.be.accessible(defaultA11yConfig);
	});
});
