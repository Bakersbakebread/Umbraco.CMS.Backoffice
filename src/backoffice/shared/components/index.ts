import { manifests as debugManifests } from './debug/manifests';

// TODO: we need to figure out what components should be available for extensions and load them upfront
// TODO: we need to move these files into their respective folders/silos. We then need a way for a silo to globally register a component
import './body-layout/body-layout.element';
import './footer-layout/footer-layout.element';
import './entity-action/entity-action-list.element';
import './entity-action/entity-action.element';
import './backoffice-frame/backoffice-header.element';
import './backoffice-frame/backoffice-main.element';
import './backoffice-frame/backoffice-modal-container.element';
import './backoffice-frame/backoffice-notification-container.element';
import './button-with-dropdown/button-with-dropdown.element';
import './code-block/code-block.element';
import './debug/debug.element';
import './donut-chart';
import './dropdown/dropdown.element';
import './empty-state/empty-state.element';
import './extension-slot/extension-slot.element';
import './checkbox-list-input/checkbox-list-input.element';
import './color-input/color-input.element';
import './culture-select-input/culture-select-input.element';
import './date-input/date-input.element';
import './document-input/document-input.element';
import './document-type-input/document-type-input.element';
import './eye-dropper-input/eye-dropper-input.element';
import './language-input/language-input.element';
import './media-input/media-input.element';
import './multi-url-input/multi-url-input.element';
import './slider-input/slider-input.element';
import './toggle-input/toggle-input.element';
import './upload-field-input/upload-field-input.element';
import './template-input/template-input.element';
import './property-type-based-property/property-type-based-property.element';
import './ref-property-editor-ui/ref-property-editor-ui.element';
import './section/section-main/section-main.element';
import './section/section-sidebar/section-sidebar.element';
import './section/section.element';

import './table/table.element';

import './tree/tree.element';
import './tree/entity-tree-item/entity-tree-item.element';
import './tree/tree-menu-item/tree-menu-item.element';

import './menu/menu-item-base/menu-item-base.element';

import './variantable-property/variantable-property.element';
import './workspace/workspace-action-menu/workspace-action-menu.element';

import './header-app/header-app-button.element';

import './history/history-list.element';
import './history/history-item.element';

import './workspace/workspace-action/workspace-action.element';
import './workspace/workspace-layout/workspace-layout.element';
import './workspace/workspace-footer-layout/workspace-footer-layout.element';

import './template-card/template-card.element';
import './code-editor';

export const manifests = [...debugManifests];
