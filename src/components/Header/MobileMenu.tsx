"use client"

import { useState, useEffect } from "react"

interface NavItem {
    href: string;
    label: string;
    target?: string;
}

interface MobileMenuProps {
    navItems: NavItem[];
    calLink: string;
}

export default function MobileMenu({ navItems, calLink }: MobileMenuProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const openMobileMenu = () => {
            if (isMobileMenuOpen) return;
            setIsMobileMenuOpen(true);
            document.body.style.overflow = "hidden";

            // Animate hamburger lines
            const line1 = document.getElementById("line1");
            const line2 = document.getElementById("line2");
            const line3 = document.getElementById("line3");

            if (line1 && line2 && line3) {
                line1.style.transform = "rotate(45deg) translate(6px, 6px)";
                line2.style.opacity = "0";
                line3.style.transform = "rotate(-45deg) translate(6px, -6px)";
            }
        };

        const closeMobileMenu = () => {
            if (!isMobileMenuOpen) return;
            setIsMobileMenuOpen(false);
            document.body.style.overflow = "";

            // Reset hamburger lines
            const line1 = document.getElementById("line1");
            const line2 = document.getElementById("line2");
            const line3 = document.getElementById("line3");

            if (line1 && line2 && line3) {
                line1.style.transform = "";
                line2.style.opacity = "";
                line3.style.transform = "";
            }
        };

        window.addEventListener('openMobileMenu', openMobileMenu);
        window.addEventListener('closeMobileMenu', closeMobileMenu);

        return () => {
            window.removeEventListener('openMobileMenu', openMobileMenu);
            window.removeEventListener('closeMobileMenu', closeMobileMenu);
        };
    }, [isMobileMenuOpen]);

    const handleCloseMobileMenu = () => {
        window.dispatchEvent(new CustomEvent('closeMobileMenu'));
    };

    const handleLinkClick = () => {
        handleCloseMobileMenu();
    };

    return <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 bg-black/50 z-[9998] transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        onClick={handleCloseMobileMenu}
        style={{ height: '100vh', width: '100vw' }}
    >
        {/* Mobile Menu Container */}
        <div
            id="mobile-menu-container"
            className={`fixed top-0 right-0 w-full h-screen bg-white transition-transform duration-300 ease-in-out overflow-y-auto p-[16px] flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
            style={{ height: '100vh', width: '100vw' }}
        >
            {/* Menu Header */}
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <a href="/">
                    <img src="/scopedb-logo.png" alt="ScopeDB" width={120} height={35} />
                </a>
                <button
                    id="mobile-menu-close"
                    className="flex flex-col gap-1 w-6 h-6 justify-center items-center"
                    onClick={handleCloseMobileMenu}
                >
                    <span className="w-[18px] h-[2px] bg-black/80 rounded transform rotate-45 translate-x-[6px] translate-y-[6px]"></span>
                    <span className="w-[18px] h-[2px] bg-black/80 rounded opacity-0"></span>
                    <span className="w-[18px] h-[2px] bg-black/80 rounded transform -rotate-45 translate-x-[6px] -translate-y-[6px]"></span>
                </button>
            </div>

            {/* Menu Navigation */}
            <nav className="flex flex-col gap-[8px] flex-1">
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        target={item.target}
                        className="text-black/80 text-[14px] py-[8px] transition-colors hover:text-black/60"
                        onClick={handleLinkClick}
                    >
                        {item.label}
                    </a>
                ))}

                {/* Demo Button */}
                <div className="mt-8">
                    <button
                        className="w-full py-[10px] px-5 bg-gray-50 border border-gray-300 rounded-[10px] text-base font-medium text-black/80 transition-colors hover:bg-gray-200"
                        data-cal-link={calLink}
                        onClick={handleLinkClick}
                    >
                        Book a demo
                    </button>
                </div>
            </nav>
        </div>
    </div>
}
