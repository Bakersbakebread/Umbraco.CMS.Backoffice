import { Meta, StoryObj } from '@storybook/web-components';
import './document-input.element';
import type { UmbDocumentInputElement } from './document-input.element';

const meta: Meta<UmbDocumentInputElement> = {
	title: 'Components/Inputs/Document',
	component: 'umb-document-input',
};

export default meta;
type Story = StoryObj<UmbDocumentInputElement>;

export const Overview: Story = {
	args: {},
};
