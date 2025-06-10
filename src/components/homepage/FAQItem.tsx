import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Props {
  question: string;
  answer: string;
}

const FAQItem: React.FC<Props> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="w-full md:w-[800px] px-[24px] py-[20px] border border-[#f0f0f0] rounded-[16px] faq-item">
      <div 
        className="flex items-center justify-between cursor-pointer faq-header"
        onClick={toggleFAQ}
      >
        <p className="text-[16px] font-semibold flex-1">
          {question}
        </p>
        <ChevronDown 
          height={20} 
          width={20} 
          className={`chevron-icon transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>
      <div className={`faq-content overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[200px]' : 'max-h-0'}`}>
        <p className="text-[16px] text-[var(--color-secondary)] mt-[8px]">
          {answer}
        </p>
      </div>
    </li>
  );
};

export default FAQItem; 
