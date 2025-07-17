import { getCloudflareContext } from "@opennextjs/cloudflare";
import Link from "next/link";
import FloatingCalButton from "../FloatingCalButton";

interface NavItem {
    href: string;
    label: string;
    target?: string;
}

export default function Header() {
    const navItems: NavItem[] = [
        {
            href: "https://docs.scopedb.io/",
            label: "Docs",
            target: "_blank"
        },
        {
            href: "/blog",
            label: "Blog"
        },
        {
            href: "/contact",
            label: "Contact"
        }
    ]

    const ctx = getCloudflareContext()
    const calLink = ctx.env.PUBLIC_CALCOM_LINK

    return <>
        <nav className="
            max-w-[1440px] mx-auto px-[12px] md:px-[24px] xl-[32px] py-[16px]
            flex justify-between items-center relative
        ">
            <a href="/"><img src="/scopedb-logo.png" alt="ScopeDB" width={120} height={35} /></a>

            <div className="hidden md:flex gap-8 text-[15px]">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        target={item.target}
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:font-medium"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="hidden md:block rounded-[10px]">
                <button
                    className="
                        px-[14px] py-[8px] text-[14px] text-[var(--button-secondary-text)]
                        bg-[var(--button-secondary-bg)] hover:bg-[var(--button-secondary-bg-hover)]
                        rounded-[12px] border border-[var(--button-secondary-border)]
                        transition-colors duration-300 ease-in-out
                    "
                    data-cal-link={calLink}
                >
                    Book a demo
                </button>
            </div>
        </nav>

        <FloatingCalButton calLink={calLink} />
    </>
}
