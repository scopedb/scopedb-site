import { Metadata } from "next"
import { FaRss } from "react-icons/fa"
import { getAllBlogPosts } from "@/utils/loader";
import FormattedDate from "@/components/FormattedData";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "ScopeDB Blog",
}

// Blog categories
const BLOG_CATEGORIES = [
  { id: "all", label: "All Posts", href: "/blog" },
  { id: "engineering", label: "Engineering", href: "/blog/category/engineering" },
  { id: "product", label: "Product", href: "/blog/category/product" },
  { id: "company", label: "Company", href: "/blog/category/company" },
];

function BlogTabs({ activeCategory = "all" }: { activeCategory?: string }) {
  return (
    <div className="mb-8">
      <nav className="flex space-x-8">
        {BLOG_CATEGORIES.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={`py-4 px-1 text-sm relative ${
              activeCategory === tab.id
                ? "text-black font-bold"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function AllPosts({ posts, category = "all" }: { posts: any[]; category?: string }) {
  const filteredPosts = category === "all" 
    ? posts.slice(0, 9)
    : posts.filter(post => post.category === category).slice(0, 9);

  return (
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
                    <FormattedDate date={new Date(post.publishedAt)} />
                    <span className="ml-1 text-xs">•</span>
                    <span className="ml-1">{post.readingTime || "5 min read"}</span>
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
  );
}

// Featured posts configuration
const FEATURED_POST_TITLES = [
  "Self-observability of ScopeDB",
  "Why Not SQL: The Origin of ScopeQL",
  "Algebraic Data Types in Database: Where Variant Data Can Help",
];

function FeaturedPosts({ posts }: { posts: any[] }) {
  const featuredPosts = FEATURED_POST_TITLES
    .map((title) => posts.find((post) => post.title === title))
    .filter(Boolean)
    .slice(0, 3);

  if (featuredPosts.length === 0) return null;

  return (
    <section className="mb-[74px]">
      <ul className="grid grid-cols-1 lg:grid-cols-5 gap-5 auto-rows-fr">
        {featuredPosts.map((post, index) => (
          <li 
            key={post.slug} 
            className={index === 0 ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-2"}
          >
            <div className="bg-white border border-[#f1f1f1] rounded-[12px] p-3 w-full h-full">
              <Link href={`/blog/${post.slug}`}>
                {post.cover && (
                  <Image
                    src={post.cover}
                    alt={post.title}
                    width={600}
                    height={420}
                    className={`rounded-[10px] w-full object-cover mb-3 ${
                      index === 0 ? "md:h-[420px]" : "lg:hidden"
                    }`}
                  />
                )}
                <div className="flex flex-col gap-2 my-3">
                  <p className="text-[14px] font-normal px-3 text-[var(--text-secondary)]">
                    <FormattedDate date={new Date(post.publishedAt)} />
                    <span className="ml-2 text-xs">•</span>
                    <span className="ml-2">{post.readingTime || "5 min read"}</span>
                  </p>
                  <div className="flex-1">
                    <h4 className={`font-semibold px-3 text-[var(--text-primary)] ${
                      index === 0 ? "text-[28px]" : "text-2xl"
                    }`}>
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
  );
}

export default async function BlogCategoryPage({ params }: { params: { category: string } }) {
  const posts = await getAllBlogPosts();
  const category = params.category;

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
      
      <FeaturedPosts posts={posts} />
      
      <div className="mt-[74px]">
        <BlogTabs activeCategory={category} />
        <AllPosts posts={posts} category={category} />
      </div>
    </main>
  );
}