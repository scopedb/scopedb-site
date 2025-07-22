import RSS from 'rss'
import { loadBlogContentByCategory } from '@/utils/loader'

export const dynamic = 'force-static'
export const revalidate = false

export async function GET() {
    const feed = new RSS({
        title: 'ScopeDB Blog',
        description: 'ScopeDB is a database that runs directly on top of any commodity object storage. It is designed explicitly for data workloads with massive writes, any-scale analysis, and flexible schema.',
        feed_url: 'https://www.scopedb.io/rss.xml',
        site_url: 'https://www.scopedb.io/blog',
        language: 'en',
        pubDate: new Date(),
        copyright: `© 2024-${new Date().getFullYear()} ScopeDB`,
    })

    const posts = await loadBlogContentByCategory('all')
    
    posts.forEach(post => {
        feed.item({
            title: post.title,
            description: post.description,
            url: `https://www.scopedb.io/blog/${post.slug}`,
            date: new Date(post.pubDate),
            categories: [post.category],
        })
    })

    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600',
        },
    })
}