import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/elements/Accordion";
import { Interactive } from "@/components/elements/Markdown/Interactive";

export const Test = () => {
  const items = [
    {
      id: "what-is-lorem-ipsum",
      title: "What is Lorem Ipsum?",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
    },
    {
      id: "why-do-we-use-it",
      title: "Why do we use it?",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
    },
    {
      id: "where-does-it-come-from",
      title: "Where does it come from?",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
    },
  ];

  return (
    <Interactive className="p-12">
      <Accordion type="single" collapsible>
        {items.map((item) => {
          const { id, title, content } = item;

          return (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{content}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Interactive>
  );
};
