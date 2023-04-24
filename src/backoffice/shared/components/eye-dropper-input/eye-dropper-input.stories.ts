import { Meta, StoryObj } from '@storybook/web-components';
import './eye-dropper-input.element';
import type { UmbEyeDropperInputElement } from './eye-dropper-input.element';

const meta: Meta<UmbEyeDropperInputElement> = {
	title: 'Components/Inputs/Eye Dropper',
	component: 'umb-eye-dropper-input',
};

export default meta;
type Story = StoryObj<UmbEyeDropperInputElement>;

export const Overview: Story = {
	args: {},
};

export const WithOpacity: Story = {
	args: {
		opacity: true,
	},
};

export const WithSwatches: Story = {
	args: {
		swatches: ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff'],
	},
};
