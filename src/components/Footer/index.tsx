export default function Footer() {
    return <div
        className="min-h-[293px]"
        style={{
            backgroundColor: "rgba(0, 0, 0, 0.01)",
            borderTop: "1px solid rgba(0, 0, 0, 0.03)",
        }}
    >
        <div className="max-w-[1440px] mx-auto px-[12px] md:px-[24px] xl-[32px] pt-[60px] flex flex-col lg:flex-row">
            <div className="flex-1 pb-[40px]">
                <div className="pb-[12px]">
                    <a href="/">
                        <img src="/scopedb-logo.png" alt="ScopeDB Logo" width={120} height={35} />
                    </a>
                </div>
                <div className="text-[14px] font-normal text-[var(--text-secondary)]">
                    © 2025 ScopeDB. All rights reserved.
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[60px] pb-[90px] text-[14px] font-[400] text-[#00000099] leading-[14px]">
                <div>
                    <div className="text-[16px] font-[500] pb-[24px] text-[var(--text-primary)]">
                        Get Started
                    </div>
                    <div className="pb-[16px] text-[14px] text-[var(--text-secondary)]">
                        <a href="https://www.scopedb.io/contact/">Book a demo</a>
                    </div>
                    <div className="pb-[16px] text-[14px] text-[var(--text-secondary)]">
                        <a href="https://www.scopedb.io/">Visit ScopeDB</a>
                    </div>
                </div>
                <div>
                    <div className="text-[16px] font-[500] pb-[24px] text-[var(--text-primary)]">
                        Product
                    </div>
                    <div className="pb-[16px] text-[14px] text-[var(--text-secondary)]">
                        <a href="https://docs.scopedb.io/">Documentation</a>
                    </div>
                    <div className="pb-[16px] text-[14px] text-[var(--text-secondary)]">
                        <a href="https://www.scopedb.io/">Changelog</a>
                    </div>
                    <div className="pb-[16px] text-[14px] text-[var(--text-secondary)]">
                        <a href="https://www.scopedb.io/">Pricing</a>
                    </div>
                </div>
                <div>
                    <div className="text-[16px] font-[500] pb-[24px] text-[var(--text-primary)]">
                        Company
                    </div>
                    <div className="pb-[16px] text-[14px] text-[var(--text-secondary)]">
                        <a href="https://www.scopedb.io/">About</a>
                    </div>
                    <div className="pb-[16px] text-[14px] text-[var(--text-secondary)]">
                        <a href="https://www.scopedb.io/blog">Blog</a>
                    </div>
                    <div className="pb-[16px] text-[14px] text-[var(--text-secondary)]">
                        <a href="https://www.scopedb.io/">Terms of Service</a>
                    </div>
                    <div className="pb-[16px] text-[14px] text-[var(--text-secondary)]">
                        <a href="https://www.scopedb.io/">Privacy Policy</a>
                    </div>
                </div>
                <div>
                    <div className="text-[16px] font-[500] pb-[24px] text-[var(--text-primary)]">
                        Connect
                    </div>
                    <div className="pb-[16px] text-[14px] text-[var(--text-secondary)]">
                        <a href="https://www.scopedb.io/contact/">Contact</a>
                    </div>
                    <div className="pb-[16px] text-[14px] text-[var(--text-secondary)]">
                        <a href="https://github.com/scopedb/">GitHub</a>
                    </div>
                    <div className="pb-[16px] text-[14px] text-[var(--text-secondary)]">
                        <a href="https://discord.gg/AynEZfqFvM">Discord</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
