/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PackageModelBaseModel } from './PackageModelBaseModel';

export type UpdatePackageRequestModel = (PackageModelBaseModel & {
packagePath?: string;
});
