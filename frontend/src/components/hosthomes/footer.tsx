import FooterLinkList from "./footerLInkList";
import LastFooter from "./lastFooter";

const Footer = () => (
  <footer className="border-t-2 sm:px-5 md:px-10  mb-4 w-full  bg-neutral-100 px-5">
    <div className="flex flex-col  sm:flex-row w-full py-10 gap-4 border-b-2">
      <FooterLinkList
        title="Support"
        links={[
          { href: "/help", text: "Help Center" },
          { href: "/help", text: "Get Help with a safety issue" },
          { href: "/help", text: "AirCover" },
          { href: "/help", text: "Anti-discrimination" },
          { href: "/help", text: "Disability support" },
          { href: "/help", text: "Cancellation options" },
          { href: "/help", text: "Report neighborhood concern" },
        ]}
      />
      <FooterLinkList
        title="Hosting"
        links={[
          { href: "/help", text: "Airbnb your home" },
          { href: "/help", text: "AirCover for Hosts" },
          { href: "/help", text: "Hosting resources" },
          { href: "/help", text: "Community forum" },
          { href: "/help", text: "Hosting responsibly" },
          { href: "/help", text: "Airbnb-friendly apartments" },
          { href: "/help", text: "Join a free Hosting class" },
        ]}
      />
      <FooterLinkList
        title="Airbnb"
        links={[
          { href: "/help", text: "NewsRoom" },
          { href: "/help", text: "NewsFeatures" },
          { href: "/help", text: "Careers" },
          { href: "/help", text: "Investors" },
          { href: "/help", text: "GiftCards" },
          { href: "/help", text: "Airbnb.org emergency stays" },
        ]}
      />
    </div>
    <LastFooter />
  </footer>
);

export default Footer;
