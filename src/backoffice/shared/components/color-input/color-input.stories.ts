import { Meta, StoryObj } from '@storybook/web-components';
import './color-input.element';
import type { UmbColorInputElement } from './color-input.element';

const meta: Meta<UmbColorInputElement> = {
	title: 'Components/Inputs/Color',
	component: 'umb-color-input',
};

export default meta;
type Story = StoryObj<UmbColorInputElement>;

export const Overview: Story = {
	args: {
		showLabels: true,
		swatches: [
			{
				label: 'Red',
				value: '#ff0000',
			},
			{
				label: 'Green',
				value: '#00ff00',
			},
		],
	},
};

export const WithoutLabels: Story = {
	args: {
		showLabels: false,
		swatches: [
			{
				label: 'Red',
				value: '#ff0000',
			},
			{
				label: 'Green',
				value: '#00ff00',
			},
		],
	},
};

// TODO: This doesn't check the correct swatch when the value is set
// Perhaps a BUG ?
export const WithValueLabels: Story = {
	args: {
		showLabels: true,
		swatches: [
			{
				label: 'Red',
				value: '#ff0000',
			},
			{
				label: 'Green',
				value: '#00ff00',
			},
		],
		value: '#00ff00',
	},
};
