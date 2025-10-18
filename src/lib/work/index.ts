import path from "path";
import {
  markdownProcessor,
  MarkdownProcessor,
} from "@/lib/markdown/markdown-processor.service";
import z from "zod";

const workDirectory = path.join(process.cwd(), "src/content/work");

export const engagementSchema = z.object({
  title: z.string(),
  description: z.string(),
  capabilities: z.array(z.string()),
  skills: z.array(z.string()),
  slug: z.string(),
  href: z.string().url(),
  cover: z.string(),
  start: z.number(),
  end: z.number(),
});

export type Engagement = z.infer<typeof engagementSchema>;

class WorkService {
  private readonly markdownProcessor: MarkdownProcessor;

  constructor(markdownProcessor: MarkdownProcessor) {
    this.markdownProcessor = markdownProcessor;
  }

  async getAllEntries(): Promise<Engagement[]> {
    const files = this.markdownProcessor.getFiles(workDirectory);

    const posts = await Promise.all(
      files.map(async (fileName) => {
        const slug = this.markdownProcessor.getSlugFromFilename(fileName);

        const metadata = await this.getEntryMetadata(slug);

        return {
          ...metadata,
          slug,
        };
      }),
    );

    return posts;
  }

  async getEntryMetadata(slug: string) {
    try {
      const file = await import(`../../content/work/${slug}.mdx`);

      if (file?.metadata) {
        const validationResult = engagementSchema.safeParse({
          ...file.metadata,
          slug,
        });

        if (!validationResult.success) {
          const errorMessages = validationResult.error.errors
            .map((err) => `${err.path.join(".")}: ${err.message}`)
            .join(", ");
          throw new Error(`Validation failed for ${slug}: ${errorMessages}`);
        }

        return validationResult.data;
      } else {
        throw new Error(`Unable to find metadata for ${slug}.mdx`);
      }
    } catch (error: any) {
      console.error("Error", error?.message);
      throw error;
    }
  }
}

export const workService = new WorkService(markdownProcessor);
