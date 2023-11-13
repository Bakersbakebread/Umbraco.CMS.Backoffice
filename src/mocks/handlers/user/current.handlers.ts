const { rest } = window.MockServiceWorker;
import { umbUsersData } from '../../data/user.data.js';
import { slug } from './slug.js';
import { umbracoPath } from '@umbraco-cms/backoffice/utils';

export const handlers = [
	rest.get(umbracoPath(`${slug}/current`), (_req, res, ctx) => {
		const loggedInUser = umbUsersData.getCurrentUser();
		return res(ctx.status(200), ctx.json(loggedInUser));
	}),

	rest.post(umbracoPath(`${slug}/current/change-password`), async (req, res, ctx) => {
		const data = await req.json();
		if (!data) return;
		if (!data.oldPassword) return;
		if (!data.newPassword) return;

		/* we don't have to update any mock data when a password is changed
		so we just return a 200 */
		return res(ctx.status(200));
	}),
];
