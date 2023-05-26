import type { ManifestPropertyEditorUI } from '@umbraco-cms/backoffice/extension-registry';

export const manifest: ManifestPropertyEditorUI = {
	type: 'propertyEditorUI',
	alias: 'My.PropertyEditorUI.AwesomeSuggestions',
	name: 'Property Editor UI Awesome Suggestions',
	loader: () => import('./property-editor-ui-suggestions-picker.element'),
	meta: {
		label: 'Awesome Suggestions Picker',
		propertyEditorModel: 'My.AwesomeSuggestions',
		icon: 'umb:document',
		group: 'common',
		config: {
			properties: [
				{
					alias: 'disabled',
					label: 'Disabled',
					description: 'Disables the suggestion button',
					propertyEditorUI: 'Umb.PropertyEditorUI.Toggle',
				},
				{
					alias: 'placeholder',
					label: 'Placeholder text',
					description: 'A nice placeholder description to help out our editor!',
					propertyEditorUI: 'Umb.PropertyEditorUI.TextBox',
				},
			],
			defaultData: [
				{
					alias: 'disabled',
					value: true,
				},
			],
		},
	},
};
