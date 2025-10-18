import path from "path";
import { sortBy } from "remeda";
import {
  markdownProcessor,
  MarkdownProcessor,
} from "@/lib/markdown/markdown-processor.service";
import z from "zod";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export const postSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  date: z.string(),
});

export type Post = z.infer<typeof postSchema>;

class PostsService {
  private readonly markdownProcessor: MarkdownProcessor;

  constructor(markdownProcessor: MarkdownProcessor) {
    this.markdownProcessor = markdownProcessor;
  }

  async getAllPosts() {
    const files = this.markdownProcessor.getFiles(postsDirectory);

    const posts = await Promise.all(
      files.map(async (fileName) => {
        const slug = this.markdownProcessor.getSlugFromFilename(fileName);

        const metadata = await this.getBlogPostMetadata(slug);

        return {
          ...metadata,
          previousPost: null,
          nextPost: null,
        };
      }),
    );

    return posts;
  }

  async getAllPostsSortedByDate() {
    const posts = await this.getAllPosts();

    return sortBy(posts, (post) => post.date);
  }

  async getBlogPostMetadata(slug: string) {
    try {
      const file = await import(`../../content/posts/${slug}.mdx`);

      if (file?.metadata) {
        const validationResult = postSchema.safeParse({
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
      throw new Error(`Unable to find metadata for ${slug}.mdx`);
    }
  }

  async getNextPost(currentSlug: string): Promise<Post | null> {
    const sortedPosts = await this.getAllPostsSortedByDate();

    const currentIndex = sortedPosts.findIndex(
      (post) => post.slug === currentSlug,
    );

    if (currentIndex === -1 || currentIndex === sortedPosts.length - 1) {
      return null;
    }

    const nextPost = sortedPosts[currentIndex + 1];

    return nextPost;
  }

  async getPreviousPost(currentSlug: string): Promise<Post | null> {
    const sortedPosts = await this.getAllPostsSortedByDate();
    const currentIndex = sortedPosts.findIndex(
      (post) => post.slug === currentSlug,
    );

    if (currentIndex === -1 || currentIndex === 0) {
      return null;
    }

    const previousPost = sortedPosts[currentIndex - 1];

    return previousPost;
  }
}

export const postsService = new PostsService(markdownProcessor);
