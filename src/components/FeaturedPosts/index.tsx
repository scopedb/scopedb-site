import { BlogPost, loadFeaturedBlogContent } from "@/utils/loader"
import Link from "next/link"
import Image from "next/image"
import FormattedDate from "@/components/FormattedData";

export default async function FeaturedPosts() {
    const featuredPosts: BlogPost[] = await loadFeaturedBlogContent()
    return (
        <section>
            <ul className="grid grid-cols-1 lg:grid-cols-5 gap-5 auto-rows-fr">
                {featuredPosts.map((post, index) => (
                    <li key={post.slug} className={index === 0 ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-2"}>
                        <div className="bg-white border border-[#F1F1F1] rounded-[20px] p-3 w-full h-full">
                            <Link href={`/blog/${post.slug}`}>
                                {post.cover && (
                                    <Image
                                        src={post.cover}
                                        alt={post.title}
                                        width={600}
                                        height={420}
                                        className={`rounded-[10px] w-full object-cover mb-3 ${index === 0 ? "md:h-[420px]" : "lg:hidden"}`}
                                    />
                                )}
                                <div className="flex flex-col gap-2 my-3">
                                    <p className="text-[14px] font-normal px-3 text-[var(--text-secondary)]">
                                        <FormattedDate date={post.pubDate} />
                                        <span className="ml-2 text-xs">•</span>
                                        <span className="ml-2">{post.readingTime}</span>
                                    </p>
                                    <div className="flex-1">
                                        <h4 className={`font-semibold px-3 text-[var(--text-primary)] ${index === 0 ? "text-[28px]" : "text-2xl"}`}>
                                            {post.title}
                                        </h4>
                                    </div>
                                    <div className="relative px-3 pb-5">
                                        <p className="text-[14px] text-[var(--text-secondary)] line-clamp-6">
                                            {post.summary}
                                        </p>
                                        <div className="absolute bottom-0 left-3 right-3 h-[60px] bg-gradient-to-t from-white to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
