import Link from "next/link"
import Image from "next/image"
import FormattedDate from "@/components/FormattedData"
import { BlogPost, loadFeaturedBlogContent } from "@/utils/loader"
import { FiArrowUpRight } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";


interface ExploreMoreProps {
  showXlCols?: boolean;
  showBlog?: boolean;
}

export default async function ExploreMore({ showXlCols = false, showBlog = true }: ExploreMoreProps) {
  const featuredPosts: BlogPost[] = await loadFeaturedBlogContent()
  return (
    <section className="mt-20">
      {showBlog && (
        <div>
          <section className="mt-[60px]">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <li key={post.slug} className="post-item">
                  <div className="bg-white border border-[#f1f1f1] rounded-[12px] p-3 w-full h-full">
                    <Link href={`/blog/${post.slug}/`}>
                      {post.cover && (
                        <Image
                          src={post.cover}
                          alt={post.title}
                          width={400}
                          height={250}
                          className="rounded-[12px] mb-5"
                        />
                      )}
                      <div className="flex flex-col gap-2 my-3">
                        <p className="text-[14px] font-normal px-3 text-[var(--text-secondary)]">
                          <FormattedDate date={post.pubDate} />
                          <span className="ml-1 text-xs">•</span>
                          <span className="ml-1">{post.readingTime || "5 min read"}</span>
                        </p>
                        <div className="flex-1">
                          <h4 className="text-xl font-medium px-3 leading-tight text-[var(--text-primary)]">
                            {post.title}
                          </h4>
                        </div>
                        <p className="text-[14px] px-3 line-clamp-2 text-[var(--text-secondary)]">
                          {post.summary}
                        </p>
                      </div>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            {featuredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">
                  No posts found for this category
                </p>
              </div>
            )}
          </section>
        </div>
      )}

      <div
        className={`flex flex-col md:flex-row gap-8 md:gap-4 mt-20 ${showXlCols ? "xl:max-w-none" : "max-w-[1200px]"}`}
      >
        {/* Join the community */}
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold mb-3 text-[var(--text-primary)]">
            Join the community
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4 max-w-[300px]">
            ScopeDB users share questions and best practices in our Discord
            community.
          </p>
          <a
            className="text-sm text-[var(--text-primary)] flex gap-1 items-center hover:underline"
            href="https://discord.gg/AynEZfqFvM"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Discord <FiArrowUpRight className="w-[16px] h-[16px]" />
          </a>
        </div>

        {/* General communicate */}
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold mb-3 text-[var(--text-primary)]">
            General communicate
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4 max-w-[300px]">
            For other queries, please get in touch with us via email.
          </p>
          <a
            className="text-sm text-[var(--text-primary)] flex gap-1 items-center hover:underline"
            href="mailto:contact@scopedb.io"
          >
            <FiMail className="w-[16px] h-[16px]" /> contact@scopedb.io
          </a>
        </div>

        {/* Documentation */}
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold mb-3 text-[var(--text-primary)]">
            Documentation
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4 max-w-[300px]">
            Get an overview of ScopeDB's features, integrations, and how to use
            them.
          </p>
          <a
            className="text-sm flex gap-1 items-center text-[var(--text-primary)] hover:underline"
            href="https://docs.scopedb.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ScopeDB Docs <FiArrowRight className="w-[16px] h-[16px]" />
          </a>
        </div>
      </div>
    </section>
  );
}
