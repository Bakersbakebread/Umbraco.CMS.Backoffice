import { UmbModalToken } from './modal-token.js';

export interface UmbSectionPickerModalData {
	multiple: boolean;
	selection: Array<string>;
}

export interface UmbSectionPickerModalValue {
	selection: Array<string>;
}

export const UMB_SECTION_PICKER_MODAL = new UmbModalToken<UmbSectionPickerModalData, UmbSectionPickerModalValue>(
	'Umb.Modal.SectionPicker',
	{
		modal: {
			type: 'sidebar',
			size: 'small',
		},
	},
);
