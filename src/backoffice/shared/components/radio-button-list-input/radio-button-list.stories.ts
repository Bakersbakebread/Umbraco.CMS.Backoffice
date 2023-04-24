import { Meta, StoryObj } from '@storybook/web-components';
import './radio-button-list-input.element';
import type { UmbRadioButtonListInputElement } from './radio-button-list-input.element';

const meta: Meta<UmbRadioButtonListInputElement> = {
	title: 'Components/Inputs/Radio Button List',
	component: 'umb-radio-button-list-input',
};

export default meta;
type Story = StoryObj<UmbRadioButtonListInputElement>;

export const Overview: Story = {
	args: {
		list: [
			{
				key: '1',
				sortOrder: 0,
				value: 'One',
			},
			{
				key: '2',
				sortOrder: 1,
				value: 'Two',
			},
			{
				key: '3',
				sortOrder: 2,
				value: 'Three',
			},
		],
	},
};

export const WithSelectedValue: Story = {
	args: {
		list: [
			{
				key: '1',
				sortOrder: 0,
				value: 'One',
			},
			{
				key: '2',
				sortOrder: 1,
				value: 'Two',
			},
			{
				key: '3',
				sortOrder: 2,
				value: 'Three',
			},
		],
		selected: '2',
		value: 'Two',
	},
};

export const SortOrder: Story = {
	args: {
		list: [
			{
				key: '1',
				sortOrder: 4,
				value: 'One',
			},
			{
				key: '2',
				sortOrder: 1,
				value: 'Two',
			},
			{
				key: '3',
				sortOrder: 2,
				value: 'Three',
			},
		],
	},
};
