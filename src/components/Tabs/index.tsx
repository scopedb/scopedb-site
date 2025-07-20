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
                "inline-flex whitespace-nowrap border-b-[4px] border-transparent py-[6px] px-[12px]",
                "text-14 font-normal text-[rgba(0,0,0,0.6)]",
                "transition-all duration-200 ease-in-out",
                "hover:border-b-[rgba(0,0,0,0.1)]",
                "aria-selected:border-b-[rgba(0,0,0,0.90)] aria-selected:text-[rgba(0,0,0,0.9)]",
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
                <nav className="flex pb-0">
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
