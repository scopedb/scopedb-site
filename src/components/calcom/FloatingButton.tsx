import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CalendarBookingUrl } from "@/src/consts";

export default function FloatingButton() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("floatingButton", {
                calLink: CalendarBookingUrl,
                buttonText: "Book a demo",
                config: {
                    name: "John",
                    email: "john@example.com",
                    theme: "light",
                },
            });
            cal("ui", {
                styles: {
                    branding: { brandColor: "#000000" },
                },
            });
        })();
    }, []);

    return <></>;
}
