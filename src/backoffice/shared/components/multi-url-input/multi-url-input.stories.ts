import { Meta, StoryObj } from '@storybook/web-components';
import './multi-url-input.element';
import type { UmbMultiUrlInputElement } from './multi-url-input.element';

const meta: Meta<UmbMultiUrlInputElement> = {
	title: 'Components/Inputs/Multi URL',
	component: 'umb-multi-url-input',
};

export default meta;
type Story = StoryObj<UmbMultiUrlInputElement>;

export const Overview: Story = {
	args: {},
};
