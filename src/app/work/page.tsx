import { Box } from "@/components/elements/Box";
import { Container } from "@/components/elements/Container";
import { Heading } from "@/components/elements/Heading";
import { workService } from "@/lib/work";

export default async function Page() {
  const [work] = await Promise.all([workService.getAllEntries()]);

  return (
    <Box className="py-24">
      <Container>
        <Heading as="h1" size="h1" className="text-text-strong">
          Work
        </Heading>
      </Container>
    </Box>
  );
}
