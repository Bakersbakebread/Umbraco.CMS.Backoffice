import { expect, fixture, html } from '@open-wc/testing';
import { UmbEyeDropperInputElement } from './eye-dropper-input.element';
import { defaultA11yConfig } from '@umbraco-cms/internal/test-utils';
describe('UmbEyeDropperInputElement', () => {
	let element: UmbEyeDropperInputElement;

	beforeEach(async () => {
		element = await fixture(html` <umb-eye-dropper-input></umb-eye-dropper-input> `);
	});

	it('is defined with its own instance', () => {
		expect(element).to.be.instanceOf(UmbEyeDropperInputElement);
	});

	it('passes the a11y audit', async () => {
		await expect(element).shadowDom.to.be.accessible(defaultA11yConfig);
	});
});
