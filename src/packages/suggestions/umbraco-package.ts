export const name = 'My.AwesomeSuggestions';
export const version = '0.0.1';
export const extensions = [
	{
		name: 'My Awesome Suggestions',
		alias: 'My.EntryPoint.AwesomeSuggestions',
		type: 'entryPoint',
		loader: () => import('./index'),
	},
	{
		name: 'My Awesome Suggestions 2',
		alias: 'My.PropertyEditorUI.AwesomeSuggestions2',
		type: 'propertyEditorUI',
		js: '/App_Plugins/property-editor.js',
		elementName: 'my-property-editor-ui-custom',
		meta: {
			label: 'My Custom Property 2',
			icon: 'document',
			group: 'common',
			propertyEditorModel: 'Umbraco.JSON',
		},
	},
];
