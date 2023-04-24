import { Meta, StoryObj } from '@storybook/web-components';
import './number-range-input.element';
import type { UmbNumberRangeInputElement } from './number-range-input.element';

const meta: Meta<UmbNumberRangeInputElement> = {
	title: 'Components/Inputs/Number Range',
	component: 'umb-number-range-input',
};

export default meta;
type Story = StoryObj<UmbNumberRangeInputElement>;

export const Overview: Story = {
	args: {},
};

export const WithMinMax: Story = {
	args: {
		minValue: 0,
		maxValue: 40,
	},
};
