import { Meta, StoryObj } from '@storybook/web-components';
import './media-input.element';
import type { UmbMediaInputElement } from './media-input.element';

const meta: Meta<UmbMediaInputElement> = {
	title: 'Components/Inputs/Media',
	component: 'umb-media-input',
};

export default meta;
type Story = StoryObj<UmbMediaInputElement>;

export const Overview: Story = {
	args: {},
};
