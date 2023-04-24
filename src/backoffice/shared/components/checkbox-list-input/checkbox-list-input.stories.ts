import { Meta, StoryObj } from '@storybook/web-components';
import './checkbox-list-input.element';
import type { UmbCheckboxListInputElement } from './checkbox-list-input.element';

const meta: Meta<UmbCheckboxListInputElement> = {
	title: 'Components/Inputs/Checkbox List',
	component: 'umb-checkbox-list-input',
};

export default meta;
type Story = StoryObj<UmbCheckboxListInputElement>;

export const Overview: Story = {
	args: {
		list: [
			{
				key: 'isAwesome',
				value: 'Umbraco is awesome?',
				checked: true,
			},
			{
				key: 'attendingCodeGarden',
				value: 'Attending CodeGarden?',
				checked: false,
			},
		],
	},
};
