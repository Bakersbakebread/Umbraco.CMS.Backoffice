import { Meta, StoryObj } from '@storybook/web-components';
import type { UmbTemplateCardElement } from './template-card.element.js';
import { html } from '@umbraco-cms/backoffice/external/lit';
import './template-card.element.js';

const meta: Meta<UmbTemplateCardElement> = {
	title: 'Components/Template Card',
	component: 'umb-template-card',
	decorators: [(Story) => html`<div style="margin:20px;">${Story()}</div>`],
};

export default meta;
type Story = StoryObj<UmbTemplateCardElement>;

export const Overview: Story = {
	args: {
		name: 'Template with a name ',
	},
	render: () =>
		html`<umb-template-card name="Name">
			<uui-tag slot="badge" look="placeholder">Badge</uui-tag>
			<uui-button slot="actions" look="placeholder" compact>Actions</uui-button>
			<uui-button look="placeholder">Default slot</uui-button>
		</umb-template-card>`,
};

export const UndefinedName: Story = {
	render: () =>
		html`<umb-template-card>
			<uui-button look="placeholder">Default slot</uui-button>
			<uui-tag slot="badge" look="placeholder">Badge</uui-tag>
		</umb-template-card>`,
};

export const TemplateCardList: Story = {
	render: () =>
		html`<div style="display:flex;align-items:stretch; gap:10px; padding:10px">
			<umb-template-card name="Template with a name" default="true">
				<uui-button>Make Default</uui-button>
			</umb-template-card>
			<umb-template-card
				name="Another template that someone gave a way way too long name without really thinking twice about it">
				<uui-button>Make Default</uui-button>
			</umb-template-card>
			<umb-template-card name="Another template"><uui-tag slot="badge">Default</uui-tag></umb-template-card>
			<umb-template-card name="Templates really shouldn't have such long names">
				<uui-button>Make Default</uui-button>
			</umb-template-card>
		</div>`,
};
