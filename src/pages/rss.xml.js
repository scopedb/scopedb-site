import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SiteName, SideDesc } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SiteName,
		description: SideDesc,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
