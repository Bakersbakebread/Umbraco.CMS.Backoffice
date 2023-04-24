import { Meta, StoryObj } from '@storybook/web-components';
import './upload-field-input.element';
import type { UmbUploadFieldInputElement } from './upload-field-input.element';

const meta: Meta<UmbUploadFieldInputElement> = {
	title: 'Components/Inputs/Upload Field',
	component: 'umb-upload-field-input',
};

export default meta;
type Story = StoryObj<UmbUploadFieldInputElement>;

export const Overview: Story = {
	args: {
		multiple: false,
	},
};
