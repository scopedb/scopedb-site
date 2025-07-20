import path from 'path';
import { cache } from 'react'
import { promises as fs } from 'fs'
import { notFound } from "next/navigation";
import { MarkdownHeading } from '@astrojs/markdown-remark'
import readingTime from 'reading-time';

export interface FrontmatterProps {
    title: string;
    description: string;
    pubDate: string;
    category: string;
    cover: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    summary: string;
    pubDate: string;
    category: string;
    cover: string;
    readingTime: string;
}

export async function loadBlogMetadata(slug: string) {
    const { frontmatter } = await loadBlogContent(slug)
    return { title: frontmatter.title }
}

export const loadBlogContent = cache(doLoadBlogContent)
export const loadBlogContentByCategory = cache(doLoadBlogContentByCategory)

async function doLoadBlogContentByCategory(category: string) {
    const contentDir = path.join(process.cwd(), 'src/content/blog')
    const candidates = await fs.readdir(contentDir)

    const posts: BlogPost[] = []
    for (const candidate of candidates) {
        const { frontmatter, body } = await loadBlogContent(candidate)
        if (category === 'all' || category === frontmatter.category) {
            const stats = readingTime(body);
            posts.push({
                slug: candidate,
                title: frontmatter.title,
                description: frontmatter.description,
                summary: frontmatter.description,
                pubDate: frontmatter.pubDate,
                category: frontmatter.category,
                cover: frontmatter.cover,
                readingTime: stats.text,
            })
        }
    }

    posts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

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
