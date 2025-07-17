"use client"

import React, { useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'

interface Props {
    question: string;
    answer: string;
}

const FAQItem: React.FC<Props> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <li className="w-full md:w-[800px] px-[24px] py-[20px] border border-[#f0f0f0] rounded-[16px] faq-item">
            <div
                className="flex items-center justify-between cursor-pointer faq-header"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className="text-[16px] flex-1 text-[var(--text-primary)]">
                    {question}
                </p>
                <LuChevronDown
                    height={20}
                    width={20}
                    className={`chevron-icon transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </div>
            <div className={`faq-content overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[200px]' : 'max-h-0'}`}>
                <p className="text-[16px] text-[var(--text-secondary)] mt-[8px]">
                    {answer}
                </p>
            </div>
        </li>
    )
}

export default FAQItem;
