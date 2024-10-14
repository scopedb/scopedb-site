import {JSX, useEffect} from "react";
import Layout from "@theme/Layout";

export default function Contact(): JSX.Element {
  return (
    <Layout>
      <main>
        <div className="container margin--xl">
          <h1>Contact Us</h1><br/>
          <div className="row">
            <div className="col col--6">
              <ContactUsForm/>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

function ContactUsForm(): JSX.Element {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js.hsforms.net/forms/embed/v2.js";
    script.async = true;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      // @ts-ignore
      const hubspot = window.hbspt;
      if (hubspot) {
        hubspot.forms.create({
          region: "na1",
          portalId: "46669159",
          formId: "f4756ffe-7b09-4175-bbbd-93612cd597a8",
          target: "#contact-us-form",
        });
      }
    });
  }, []);
  return (
    <div id="contact-us-form"/>
  );
}
