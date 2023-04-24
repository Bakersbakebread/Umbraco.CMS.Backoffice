import { Meta, StoryObj } from '@storybook/web-components';
import './language-input.element';
import type { UmbLanguageInputElement } from './language-input.element';

const meta: Meta<UmbLanguageInputElement> = {
	title: 'Components/Inputs/Language',
	component: 'umb-language-input',
};

export default meta;
type Story = StoryObj<UmbLanguageInputElement>;

export const Overview: Story = {
	args: {},
};
