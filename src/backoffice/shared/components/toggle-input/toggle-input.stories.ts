import { Meta, StoryObj } from '@storybook/web-components';
import './toggle-input.element';
import type { UmbToggleInputElement } from './toggle-input.element';

const meta: Meta<UmbToggleInputElement> = {
	title: 'Components/Inputs/Toggle',
	component: 'umb-toggle',
};

export default meta;
type Story = StoryObj<UmbToggleInputElement>;

export const Overview: Story = {
	args: {
		checked: true,
		showLabels: true,
		labelOn: 'On',
		labelOff: 'Off',
	},
};

export const WithDifferentLabels: Story = {
	args: {
		checked: false,
		showLabels: true,
		labelOn: 'Hide the treasure',
		labelOff: 'Show the way to the treasure',
	},
};

export const WithNoLabels: Story = {
	args: {
		checked: true,
		showLabels: false,
	},
};
