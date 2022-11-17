import { handlers as dataTypeHandlers } from './domains/data-type.handlers';
import { handlers as documentTypeHandlers } from './domains/document-type.handlers';
import { handlers as treeHandlers } from './domains/entity.handlers';
import { handlers as installHandlers } from './domains/install.handlers';
import * as manifestsHandlers from './domains/manifests.handlers';
import { handlers as contentHandlers } from './domains/node.handlers';
import { handlers as publishedStatusHandlers } from './domains/published-status.handlers';
import * as serverHandlers from './domains/server.handlers';
import { handlers as upgradeHandlers } from './domains/upgrade.handlers';
import { handlers as userHandlers } from './domains/user.handlers';
import { handlers as telemetryHandlers } from './domains/telemetry.handlers';
import { handlers as usersHandlers } from './domains/users.handlers';
import { handlers as userGroupsHandlers } from './domains/user-groups.handlers';

// treeHandlers
import { handlers as treeDocumentHandlers } from './domains/tree-document.handlers';
import { handlers as treeMediaHandlers } from './domains/tree-media.handlers';
import { handlers as treeDataTypeHandlers } from './domains/tree-data-type.handlers';
import { handlers as treeDocumentTypeHandlers } from './domains/tree-document-type.handlers';
import { handlers as treeMediaTypeHandlers } from './domains/tree-media-type.handlers';
import { handlers as treeMemberTypeHandlers } from './domains/tree-member-type.handlers';
import { handlers as treeMemberGroupHandlers } from './domains/tree-member-group.handlers';

const handlers = [
	serverHandlers.serverVersionHandler,
	...contentHandlers,
	...installHandlers,
	...upgradeHandlers,
	...userHandlers,
	...dataTypeHandlers,
	...documentTypeHandlers,
	...treeHandlers,
	...manifestsHandlers.default,
	...telemetryHandlers,
	...publishedStatusHandlers,
	...usersHandlers,
	...userGroupsHandlers,

	...treeDocumentHandlers,
	...treeMediaHandlers,
	...treeDataTypeHandlers,
	...treeDocumentTypeHandlers,
	...treeMediaTypeHandlers,
	...treeMemberTypeHandlers,
	...treeMemberGroupHandlers,
];

switch (import.meta.env.VITE_UMBRACO_INSTALL_STATUS) {
	case 'must-install':
		handlers.push(serverHandlers.serverMustInstallHandler);
		break;
	case 'must-upgrade':
		handlers.push(serverHandlers.serverMustUpgradeHandler);
		break;
	default:
		handlers.push(serverHandlers.serverRunningHandler);
}

switch (import.meta.env.MODE) {
	case 'development':
		handlers.push(manifestsHandlers.manifestDevelopmentHandler);
		break;

	default:
		handlers.push(manifestsHandlers.manifestEmptyHandler);
}

export { handlers };
