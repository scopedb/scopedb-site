import { Metadata } from "next"
import { FaRss } from "react-icons/fa"

export const metadata: Metadata = {
    title: "ScopeDB Blog",
}

export default function BlogIndex() {
    return <div className="max-w-[1440px] mx-auto px-[12px] md:px-[24px] xl-[32px]">
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
                    <FaRss width={16} height={16} />
                </a>
            </div>
        </div>
        {/* <FeaturedPosts />
        <div className="mt-[74px]">
            <BlogTabs activeTab="all" />
            <AllPosts category="all" />
        </div> */}
    </div>
}
