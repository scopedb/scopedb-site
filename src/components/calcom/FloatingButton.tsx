import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CalLink } from "@/src/consts";

export default function FloatingButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("floatingButton", {
        calLink: CalLink,
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
  }, []);

  return <></>;
}
