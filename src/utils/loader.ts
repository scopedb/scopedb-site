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

const blogList = [
    'manage-observability-data-in-petabytes',
    'scopeql-origins',
    'algebraic-data-type-variant-data',
]

async function doLoadBlogContent(slug: string) {
    const candidates = []
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
