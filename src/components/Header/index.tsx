import FloatingCalButton from "@/components/FloatingCalButton"
import HeaderNav from "./HeaderNav"
import MobileMenu from "./MobileMenu"
import { calLink } from "@/constant"

interface NavItem {
    href: string;
    label: string;
    target?: string;
}

export default async function Header() {
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

    return <>
        <HeaderNav navItems={navItems} calLink={calLink} />
        <FloatingCalButton calLink={calLink} />
        <MobileMenu navItems={navItems} calLink={calLink} />
    </>
}
