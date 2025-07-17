import path from 'path';
import { cache } from 'react'
import { promises as fs } from 'fs'
import { notFound } from "next/navigation";
import { MarkdownHeading } from '@astrojs/markdown-remark'

export interface FrontmatterProps {
    title: string;
    description: string;
    pubDate: string;
    category: string;
    heroImage: string;
}

export async function loadBlogMetadata(slug: string) {
    const { frontmatter } = await loadBlogContent(slug)
    return { title: frontmatter.title }
}

export const loadBlogContent = cache(doLoadBlogContent)
export const loadBlogContentByCategory = cache(doLoadBlogContentByCategory)

async function doLoadBlogContentByCategory(category: string) {
    const candidates: string[] = []
    fs.readdir(path.join(process.cwd(), 'src/content/blog'))
        .then(dirs => dirs.forEach(dir => candidates.push(dir)))
        .catch(err => console.error('Failed to read blog directory:', err))

    const posts = []
    for (const candidate of candidates) {
        const { Content, body, frontmatter, headings } = await loadBlogContent(candidate)
        if (category === 'all' || category === frontmatter.category) {
            posts.push({ slug: candidate, frontmatter, Content, headings, body })
        }
    }
    return posts
}

async function doLoadBlogContent(slug: string) {
    const candidates: string[] = []
    candidates.push(`${slug}/index.mdx`)

    for (const candidate of candidates) {
        try {
            const { default: Content, frontmatter, headings } = await import(`@/content/blog/${candidate}`)
            const body = await fs.readFile(path.join(process.cwd(), `src/content/blog/${candidate}`), 'utf-8')
            return {
                Content,
                body,
                frontmatter: frontmatter as FrontmatterProps,
                headings: headings as MarkdownHeading[],
            }
        } catch (error) {
            if (error instanceof Error && error.message.includes('Cannot find module')) {
                // try other candidates
                continue
            }
            console.warn(`Failed to load blog content of ${candidate}:`, error)
        }
    }

    notFound()
}
