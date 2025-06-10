'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ContactUrl } from '@/src/consts';

interface FormData {
  name: string;
  email: string;
  'company-size': string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    'company-size': '1-10',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        companySize: formData['company-size'],
        message: formData.message
      };

      const response = await fetch(ContactUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="text-center">
        <div className="w-[80px] h-[80px] bg-[var(--color-brand)] rounded-full flex items-center justify-center mx-auto mb-[24px]">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6L9 17l-5-5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-[24px] font-semibold text-[var(--color-primary)] mb-[16px]">
          Thanks for contacting us!
        </h3>
        <p className="text-[16px] text-[var(--color-secondary)]">
          We will get in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[12px]">
        <label htmlFor="name" className="text-[14px] text-[var(--color-primary)]">
          Full Name
        </label>
        <input
          className="rounded-[10px] border border-[#ECECEC] p-[12px] text-[14px] text-[var(--color-primary)] bg-white"
          type="text"
          id="name"
          name="name"
          placeholder="John Smith"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="flex flex-col gap-[12px]">
        <label htmlFor="email" className="text-[14px] text-[var(--color-primary)]">
          Email
        </label>
        <input
          className="rounded-[10px] border border-[#ECECECEC] p-[12px] text-[14px] text-[var(--color-primary)] bg-white"
          type="email"
          id="email"
          name="email"
          placeholder="john@company.com"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="flex flex-col gap-[12px]">
        <label htmlFor="company-size" className="text-[14px] text-[var(--color-primary)]">
          Company Size
        </label>
        <div className="relative">
          <select
            className="w-full rounded-[10px] border border-[#ECECECEC] p-[12px] text-[14px] text-[var(--color-primary)] bg-white"
            id="company-size"
            name="company-size"
            style={{ appearance: 'none' }}
            value={formData['company-size']}
            onChange={handleInputChange}
            required
          >
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-1000">201-1000</option>
            <option value="1000+">1000+</option>
          </select>
          <ChevronDown className="absolute right-[12px] top-[50%] translate-y-[-50%] w-[20px] h-[20px] text-[var(--color-primary)] pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col gap-[12px]">
        <label htmlFor="message" className="text-[14px] text-[var(--color-primary)]">
          How can we help you?
        </label>
        <textarea
          className="rounded-[10px] border border-[#ECECECEC] p-[12px] text-[14px] text-[var(--color-primary)] bg-white"
          id="message"
          name="message"
          placeholder=""
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#FFFFFF] border border-[#ECECEC] py-[10px] px-[16px] rounded-[10px] cursor-pointer w-full disabled:opacity-50"
      >
        <span className="gap-[10px] text-[14px] text-[var(--color-primary)] text-center">
          {isLoading ? 'Sending...' : 'Send Message'}
        </span>
      </button>
    </form>
  );
};

export default ContactForm; 
