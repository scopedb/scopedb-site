"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface NavItem {
    href: string;
    label: string;
    target?: string;
}

interface HeaderNavProps {
    navItems: NavItem[];
    calLink: string;
}

export default function HeaderNav({ navItems, calLink }: HeaderNavProps) {
    const openMobileMenu = () => {
        window.dispatchEvent(new CustomEvent('openMobileMenu'));
    };

    return (
        <header 
            id="header" 
            className="fixed top-0 left-0 right-0 z-[100] bg-white"
        >
            <nav className="max-w-[1440px] mx-auto px-[12px] md:px-[24px] xl-[32px] py-[16px] flex justify-between items-center relative">
                <div>
                    <Link href="/">
                        <Image src="/scopedb-logo.png" alt="ScopeDB" width={120} height={35} />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-8 text-[15px]">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            target={item.target}
                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:font-medium transition-colors duration-200"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex flex-col gap-1 w-6 h-6 justify-center items-end"
                    onClick={openMobileMenu}
                    id="mobile-menu-button"
                >
                    <span
                        className="w-[18px] h-[2px] bg-[#000]/80 transition-all rounded-[4px] duration-300 ease-in-out"
                        id="line1"
                    ></span>
                    <span
                        className="w-[18px] h-[2px] bg-[#000]/80 transition-all rounded-[4px] duration-300 ease-in-out"
                        id="line2"
                    ></span>
                    <span
                        className="w-[18px] h-[2px] bg-[#000]/80 transition-all rounded-[4px] duration-300 ease-in-out"
                        id="line3"
                    ></span>
                </button>

                {/* Desktop Book Demo Button */}
                <div className="hidden md:block rounded-[10px]">
                    <button
                        className="text-[14px] px-[14px] py-[8px] bg-[var(--button-secondary-bg)] rounded-[12px] border border-[var(--button-secondary-border)] hover:bg-[var(--button-secondary-bg-hover)] text-[var(--button-secondary-text)] transition-colors duration-300 ease-in-out"
                        data-cal-link={calLink}
                    >
                        Book a demo
                    </button>
                </div>
            </nav>
        </header>
    );
}
