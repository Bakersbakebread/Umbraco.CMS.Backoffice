import { manifests as entityActionsManifests } from './entity-actions/manifests.js';
import { manifests as navigationManifests } from './navigation/manifests.js';
import { manifests as repositoryManifests } from './repository/manifests.js';
import { manifests as treeManifests } from './tree/manifests.js';
import { manifests as workspaceManifests } from './workspace/manifests.js';

export const manifests = [
	...entityActionsManifests,
	...navigationManifests,
	...repositoryManifests,
	...treeManifests,
	...workspaceManifests,
];
