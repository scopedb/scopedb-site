import { getCloudflareContext } from "@opennextjs/cloudflare";
import FloatingCalButton from "../FloatingCalButton";
import HeaderNav from "./HeaderNav";
import MobileMenu from "./MobileMenu";

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

    const ctx = await getCloudflareContext({ async: true })
    const calLink = ctx.env.PUBLIC_CALCOM_LINK

    return <>
        <HeaderNav navItems={navItems} calLink={calLink} />
        <FloatingCalButton calLink={calLink} />
        <MobileMenu navItems={navItems} calLink={calLink} />
    </>
}
