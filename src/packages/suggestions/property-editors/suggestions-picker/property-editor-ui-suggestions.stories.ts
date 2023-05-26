import './property-editor-ui-suggestions-picker.element';
import '../../components/suggestions-input/suggestions-input.element';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { UmbSuggestionsPickerElement } from './property-editor-ui-suggestions-picker.element';

export default {
	title: 'My/Suggestions',
	component: 'umb-suggestions-picker',
	args: {},
	parameters: {},
} satisfies Meta<UmbSuggestionsPickerElement>;

type Story = StoryObj<UmbSuggestionsPickerElement>;

export const Overview: Story = {
	args: {
		value: 'yes',
	},
};
