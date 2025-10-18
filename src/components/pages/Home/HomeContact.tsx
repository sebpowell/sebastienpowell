import { Box } from "@/components/elements/Box";
import { Link } from "@/components/elements/Link";
import {
  Calendar,
  Calendar1,
  CalendarCheck2,
  CalendarDays,
  MailOpen,
} from "lucide-react";
import { createElement } from "react";
import { SiGithub, SiCalendly } from '@icons-pack/react-simple-icons';


type ContactRow = {
  title: string;
  label: string;
  href: string;
  icon: React.ReactNode;
};

const ContactRow = (props: ContactRow) => {
  const { title, label, href, icon } = props;

  return (
    <Box className="flex flex-col lg:flex-row lg:items-center gap-4">
      <Box className="leading-none text-text-muted">
        {/* {title} */}

        {createElement(icon, {className: "size-5"})}
      </Box>
      <Box className="flex gap-1 leading-none text-text-strong">
        <Link as="a" href={href} target="_blank" variant="ghost" external>
          {label}
        </Link>
      </Box>
    </Box>
  );
};

const HomeContact = () => {
  const details: { title: string; label: string; href: string }[] = [
    {
      title: "Github",
      label: "sebpowell",
      href: "https://github.com/sebpowell",
      icon: SiGithub,
    },
    {
      title: "LinkedIn",
      label: "sebastienpowell",
      href: "https://www.linkedin.com/in/sebastienpowell/",
      icon: MailOpen,
    },
    {
      title: "Email",
      label: "sebastienpowell@protonmail.com",
      href: "mailto:sebastienpowell@protonmail.com",
      icon: MailOpen,
    },
    {
      title: "Calendly",
      label: "sebastienpowell",
      href: "https://calendly.com/sebastienpowell",
      icon: SiCalendly,
    },
  ];

  return (
    <Box className="space-y-5">
      {details.map((detail, i) => {
        return <ContactRow {...detail} key={i} />;
      })}
    </Box>
  );
};

export { HomeContact };
