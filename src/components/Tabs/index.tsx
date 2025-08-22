/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client"

import clsx from "clsx";
import { useState } from "react"

const TabButton = ({ activeTab, label, onClick }: { activeTab: string; label: string; onClick: (label: string) => void; }) => {
    const handleClick = () => onClick(label);

    return (
        <div
            aria-selected={activeTab === label}
            onClick={handleClick}
            className={clsx(
                "inline-flex whitespace-nowrap rounded-lg py-[4px] px-[12px]",
                "text-14 font-normal transition-all duration-200 ease-in-out cursor-pointer",
                "min-w-[88px] justify-center",
                activeTab === label 
                    ? "bg-white text-[rgba(0,0,0,0.8)] shadow-[0px_0px_4px_2px_rgba(0,0,0,0.02)]" 
                    : "text-[rgba(0,0,0,0.4)] hover:text-[#000000cc]"
            )}
        >
            {label}
        </div>
    )
};

/**
 * Dummy element, needed for `<Tabs/>` component to work properly
 */
export const Tab = ({ children }: { children: any }) => children;

/**
 * @example
 * <Tabs>
 *   <Tab label="Tab1">Tab 1 content...</Tab>
 *   <Tab label="Tab2">Tab 2 content...</Tab>
 * </Tabs>
 */
export const Tabs = ({ children }: { children: any }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    return (
        <div className="flex flex-col overflow-hidden">
            <div>
                <nav className="inline-flex bg-[rgba(0,0,0,0.05)] rounded-[12px] p-1 gap-1">
                    {children.map((child: any) => {
                        const { label } = child.props;
                        return (
                            <TabButton
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={setActiveTab}
                            />
                        );
                    })}
                </nav>
                <div className="overflow-hidden">
                    {children.map((child: any) => {
                        if (child.props.label !== activeTab) {
                            return;
                        }
                        return child.props.children;
                    })}
                </div>
            </div>
        </div>
    );
};
