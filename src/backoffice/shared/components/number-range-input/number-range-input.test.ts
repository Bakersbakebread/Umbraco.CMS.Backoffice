import { expect, fixture, html } from '@open-wc/testing';
import { UmbNumberRangeInputElement } from './number-range-input.element';
import { defaultA11yConfig } from '@umbraco-cms/internal/test-utils';
describe('UmbNumberRangeInputElement', () => {
	let element: UmbNumberRangeInputElement;

	beforeEach(async () => {
		element = await fixture(html` <umb-number-range-input></umb-number-range-input> `);
	});

	it('is defined with its own instance', () => {
		expect(element).to.be.instanceOf(UmbNumberRangeInputElement);
	});

	it('passes the a11y audit', async () => {
		await expect(element).shadowDom.to.be.accessible(defaultA11yConfig);
	});
});
