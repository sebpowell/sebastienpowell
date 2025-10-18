import path from "path";
import { sortBy } from "remeda";
import { Post } from "@/interfaces/post.type";
import {
  markdownProcessor,
  MarkdownProcessor,
} from "@/lib/markdown/markdown-processor.service";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

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
          ...metadata.metadata,
          slug,
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
        if (!file.metadata.title || !file.metadata.description) {
          throw new Error(`Missing some required metadata fields in: ${slug}`);
        }

        return {
          slug,
          metadata: file.metadata,
        };
      } else {
        throw new Error(`Unable to find metadata for ${slug}.mdx`);
      }
    } catch (error: any) {
      console.error("Error", error?.message);
      return notFound();
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
