import RSS from 'rss'

export async function GET(_: Request) {
    const feed = new RSS({
        title: 'ScopeDB Blogs',
        description: 'ScopeDB blogs on engineering, product, and more.',
        site_url: 'https://www.scopedb.com',
        feed_url: `https://www.scopedb.com/feed.xml`,
        copyright: `© 2024-${new Date().getFullYear()} ScopeDB`,
        language: 'en',
        pubDate: new Date(),
    })

    // const posts = await loadBlogContentByCategory('all')
    // posts.forEach(post => {
    //     feed.item({
    //         title: post.title,
    //         description: post.description,
    //         url: `https://www.scopedb.com/blog/${post.slug}`,
    //         date: post.pubDate,
    //         categories: [post.category],
    //     })
    // })

    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'application/atom+xml; charset=utf-8',
        },
    })
}
