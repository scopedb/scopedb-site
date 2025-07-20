"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { clsx } from 'clsx';
import { BlogPost } from "@/utils/loader"
import Link from "next/link"
import Image from "next/image"
import FormattedDate from "@/components/FormattedData"

export default function BlogCategories({ posts }: { posts: BlogPost[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const categories = [
        { id: "all", label: "All Posts" },
        { id: "engineering", label: "Engineering" },
        { id: "product", label: "Product" },
        { id: "company", label: "Company" },
    ]

    const category = searchParams.get('category') || 'all'
    const activeCategory = categories.find(cat => cat.id === category.toLowerCase())?.id || 'all'
    const filteredPosts = activeCategory === 'all' ? posts : posts.filter(post => post.category === activeCategory)

    return <>
        <nav className="mb-8 flex space-x-8">
            {categories.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => {
                        const newParams = new URLSearchParams(searchParams.toString())
                        newParams.set('category', tab.id)
                        router.push(`/blog?${newParams.toString()}`, { scroll: false })
                    }}
                    className={clsx(
                        "py-4 px-1 text-sm relative",
                        activeCategory === tab.id
                            ? "text-black font-bold"
                            : "text-gray-600 hover:text-black"
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </nav>

        <section className="pb-[200px]">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPosts.map((post) => (
                    <li key={post.slug}>
                        <div className="bg-white border border-[#f1f1f1] rounded-[12px] p-3 w-full h-full">
                            <Link href={`/blog/${post.slug}`}>
                                {post.cover && (
                                    <Image
                                        src={post.cover}
                                        alt={post.title}
                                        width={600}
                                        height={400}
                                        className="rounded-[12px] mb-5"
                                    />
                                )}
                                <div className="flex flex-col gap-2 my-3">
                                    <p className="text-[14px] font-normal px-3 text-[var(--text-secondary)]">
                                        <FormattedDate date={post.pubDate} />
                                        <span className="ml-1 text-xs">•</span>
                                        <span className="ml-1">{post.readingTime}</span>
                                    </p>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-medium px-3 leading-tight text-[var(--text-primary)]">
                                            {post.title}
                                        </h4>
                                    </div>
                                    <p className="text-[14px] text-[var(--text-secondary)] px-3 line-clamp-2">
                                        {post.summary}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>

            {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-sm">
                        No posts found for this category
                    </p>
                </div>
            )}
        </section>
    </>
}
