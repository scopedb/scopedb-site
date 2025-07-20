"use client"

import { useEffect } from "react"
import { getCalApi } from "@calcom/embed-react"

export default function FloatingButton({ calLink }: { calLink: string }) {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("floatingButton", {
                calLink: calLink,
                buttonText: "Book a demo",
                config: {
                    name: "John Smith",
                    email: "john@company.com",
                    theme: "light",
                },
            });
            cal("ui", {
                styles: {
                    branding: { brandColor: "#000000" },
                },
            });
        })();
    }, [calLink]);

    return <></>;
}
