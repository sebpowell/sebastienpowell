import { Box } from "@/components/elements/Box";
import { Link } from "@/components/elements/Link";

type ContactRow = {
  title: string;
  label: string;
  href: string;
};

const ContactRow = (props: ContactRow) => {
  const { title, label, href } = props;

  return (
    <Box className="flex flex-col lg:flex-row lg:items-center">
      <Box className="lg:w-[150px]">{title}</Box>
      <Box className="flex gap-1 text-text-strong">
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
    },
    {
      title: "LinkedIn",
      label: "sebastienpowell",
      href: "https://www.linkedin.com/in/sebastienpowell/",
    },
    {
      title: "Email",
      label: "sebastienpowell@protonmail.com",
      href: "mailto:sebastienpowell@protonmail.com",
    },
    {
      title: "Calendly",
      label: "sebastienpowell",
      href: "https://calendly.com/sebastienpowell",
    },
  ];

  return (
    <>
      <Box className="space-y-3">
        {details.map((detail, i) => {
          return <ContactRow {...detail} key={i} />;
        })}
      </Box>
    </>
  );
};

export { HomeContact };
