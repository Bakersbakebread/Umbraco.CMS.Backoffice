import { Meta, StoryObj } from '@storybook/web-components';
import './culture-select-input.element';
import type { UmbCultureSelectInputElement } from './culture-select-input.element';

const meta: Meta<UmbCultureSelectInputElement> = {
	title: 'Components/Inputs/Culture Select',
	component: 'umb-culture-select-input',
};

export default meta;
type Story = StoryObj<UmbCultureSelectInputElement>;

export const Overview: Story = {
	args: {
		readonly: false,
		disabled: false,
	},
};

export const ReadOnly: Story = {
	args: {
		readonly: true,
		disabled: false,
	},
};

export const Disabled: Story = {
	args: {
		readonly: false,
		disabled: true,
	},
};

export const WithValue: Story = {
	args: {
		readonly: false,
		disabled: false,
		value: 'da-DK',
	},
};

export const WithValueAndDisabled: Story = {
	args: {
		readonly: false,
		disabled: true,
		value: 'en-US',
	},
};

export const WithValueAndReadOnly: Story = {
	args: {
		readonly: true,
		disabled: false,
		value: 'en-GB',
	},
};
