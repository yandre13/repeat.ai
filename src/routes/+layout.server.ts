import { createClient } from '$lib/prismicio';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
	const client = createClient({ fetch, cookies });

	const header = await client.getSingle('header');
	const footer = await client.getSingle('footer');

	return {
		header,
		footer
	};
};

export const prerender = 'auto';
