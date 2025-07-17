import { Metadata } from "next"
import { MdCheckCircle } from "react-icons/md"
import { LuCalendarDays } from "react-icons/lu"
import { getCloudflareContext } from "@opennextjs/cloudflare"
import ContactForm from "@/components/ContactForm"

export const metadata: Metadata = {
    title: "Contact Us",
}

export default function ContactPage() {
    const ctx = getCloudflareContext()
    const calLink = ctx.env.PUBLIC_CALCOM_LINK
    const contactLink = ctx.env.PUBLIC_CONTACT_LINK

    return (
        <div className="max-w-[1440px] mx-auto px-[12px] md:px-[24px] xl-[32px]">
            <h1 className="mx-auto mt-[60px] text-[32px] md:text-[40px] font-medium text-[var(--text-primary)] text-center">
                Contact Us
            </h1>
            <p className="max-w-[1024px] mx-auto mt-[24px] leading-tight text-[16px] md:text-[20px] font-normal text-[var(--text-secondary)] text-center">
                Contact us for demos, onboarding guidance, or answers to product questions.
            </p>

            <div className="max-w-[1200px] mx-auto mt-[60px] flex flex-col md:flex-row md:items-center md:justify-between bg-[rgba(0,0,0,0.01)] rounded-[12px] p-[24px] md:p-[64px]">
                <div>
                    <h2 className="text-[24px] font-semibold text-[var(--text-primary)]">
                        Get In Touch
                    </h2>
                    <p className="mt-[20px] text-[16px] leading-tight text-[var(--text-secondary)] max-w-[420px]">
                        Speak to the founders about plans, pricing, enterprise contracts, or
                        request a demo.
                    </p>
                    <ul
                        className="mt-[32px] flex flex-col gap-[12px] text-[14px] text-[var(--text-secondary)]"
                    >
                        <li>
                            <span className="flex items-center gap-[12px]">
                                <MdCheckCircle width={20} height={20} />
                                Request a demo
                            </span>
                        </li>
                        <li>
                            <span className="flex items-center gap-[12px]">
                                <MdCheckCircle width={20} height={20} />
                                Understand what problems ScopedDB can actually solve.
                            </span>
                        </li>
                        <li>
                            <span className="flex items-center gap-[12px]">
                                <MdCheckCircle width={20} height={20} />
                                Get onboarding help
                            </span>
                        </li>
                    </ul>

                    <button
                        className="mt-[32px] bg-[var(--button-primary-bg)] border-[var(--button-primary-border)] hover:bg-[var(--button-primary-bg-hover)] text-[var(--button-primary-text)] px-[14px] py-[8px] rounded-[12px] border transition-colors duration-300 ease-in-out"
                        data-cal-link={calLink}
                    >
                        <span className="flex items-center gap-[10px] text-[14px] text-[white]">
                            <LuCalendarDays width={16} height={16} />
                            Book A Demo
                        </span>
                    </button>
                </div>
                <div className="md:w-[420px] md:mt-0 mt-[40px]">
                    <ContactForm contactLink={contactLink} />
                </div>
            </div>
        </div>
    )
}
