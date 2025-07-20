import { Metadata } from "next"
import { FaRss } from "react-icons/fa"
import FeaturedPosts from "@/components/FeaturedPosts"
import BlogCategories from "@/components/BlogCategories"
import { loadBlogContentByCategory } from "@/utils/loader"

export const metadata: Metadata = {
  title: "ScopeDB Blog",
}

export default async function BlogIndex() {
  const posts = await loadBlogContentByCategory('all')
  return (
    <main className="max-w-[1440px] mx-auto px-[12px] md:px-[24px] xl:px-[32px]">
      <div className="flex items-center justify-between py-[64px]">
        <div className="text-[32px] md:text-[40px] font-medium text-[var(--text-primary)]">
          ScopeDB Blog
        </div>
        <div className="flex items-center gap-[12px]">
          <span className="text-[14px] text-[var(--text-secondary)]">
            Subscribe via
          </span>
          <a
            href="/rss.xml"
            className="w-[36px] h-[36px] bg-[#fff] border text-[var(--text-secondary)] border-[#F1F1F1] rounded-full flex items-center justify-center hover:bg-[#F1F1F1] transition-colors"
            title="Subscribe to RSS feed"
          >
            <FaRss size={16} />
          </a>
        </div>
      </div>

      <div className="mb-[74px]">
        <FeaturedPosts />
      </div>

      <div className="mt-[74px]">
        <BlogCategories posts={posts} />
      </div>
    </main>
  );
}
