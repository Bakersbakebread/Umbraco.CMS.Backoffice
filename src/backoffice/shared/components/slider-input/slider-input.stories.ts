import { Meta, StoryObj } from '@storybook/web-components';
import './slider-input.element';
import type { UmbSliderInputElement } from './slider-input.element';

const meta: Meta<UmbSliderInputElement> = {
	title: 'Components/Inputs/Slider',
	component: 'umb-slider-input',
};

export default meta;
type Story = StoryObj<UmbSliderInputElement>;

export const Overview: Story = {
	args: {
		min: 0,
		max: 100,
		step: 10,
		initVal1: 20,
	},
};

export const WithRange: Story = {
	args: {
		min: 0,
		max: 100,
		step: 10,
		initVal1: 20,
		initVal2: 80,
		enableRange: true,
	},
};

export const WithSmallStep: Story = {
	args: {
		min: 0,
		max: 5,
		step: 1,
		initVal1: 4,
	},
};

export const WithLargeMinMax: Story = {
	args: {
		min: 0,
		max: 100,
		step: 1,
		initVal1: 86,
	},
};
