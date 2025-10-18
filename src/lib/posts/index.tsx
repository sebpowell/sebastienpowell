import fs from "fs";
import path from "path";
import { sortBy } from "remeda";
import { Post } from "@/interfaces/post.type";
import matter from "gray-matter";
import { validateTags, validateCapabilities } from "./validateEnums";
import { notFound } from "next/navigation";

class MarkdownProcessor {
  getSlugFromFilename(filename: string) {
    return filename.replace(/\.mdx$/, "");
  }

  getFullPathFromSlug(slug: string) {
    return path.join(postsDirectory, `${slug}${fileExtension}`);
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
}

export const markdownProcessor = new MarkdownProcessor();

// function isValidPostMetadata(
//   data: any,
// ): data is Pick<Post, "title" | "date" | "tags" | "capabilities"> {
//   return (
//     typeof data === "object" &&
//     data !== null &&
//     typeof data.title === "string" &&
//     typeof data.date === "string" &&
//     (data.tags === undefined || Array.isArray(data.tags)) &&
//     (data.capabilities === undefined || Array.isArray(data.capabilities))
//   );
// }

const postsDirectory = path.join(process.cwd(), "src/content/posts");
const fileExtension = ".mdx";

export async function getAllPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(postsDirectory);

  const files = fileNames.filter((fileName) =>
    fileName.endsWith(fileExtension),
  );

  const posts = await Promise.all(
    files.map(async (fileName) => {
      const slug = markdownProcessor.getSlugFromFilename(fileName);

      

      const metadata = await markdownProcessor.getBlogPostMetadata(slug);

      

      

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

// export async function getPostBySlug(slug: string): Promise<Post | null> {
//   try {
//     const fullPath = getFullPathFromSlug(slug);

//     const markdownWithMeta = fs.readFileSync(fullPath, "utf8");

//     const [metadata] = await Promise.all([
//       getPostMetadata(fullPath),
//       // getPreviousPost(slug),
//       // getNextPost(slug),
//     ]);

//     return {
//       ...metadata,
//       slug,
//       source: markdownWithMeta,
//       previousPost: null,
//       nextPost: null,
//     };
//   } catch (error) {
//     return null;
//   }
// }

// export async function getAllPostsSortedByDate() {
//   const posts = await getAllPosts();

//   return sortBy(posts, (post) => post.date);
// }

// export async function getNextPost(currentSlug: string): Promise<Post | null> {
//   const sortedPosts = await getAllPostsSortedByDate();

//   const currentIndex = sortedPosts.findIndex(
//     (post) => post.slug === currentSlug,
//   );

//   if (currentIndex === -1 || currentIndex === sortedPosts.length - 1) {
//     return null;
//   }

//   const nextPost = sortedPosts[currentIndex + 1];

//   return nextPost;
// }

// export async function getPreviousPost(
//   currentSlug: string,
// ): Promise<Post | null> {
//   const sortedPosts = await getAllPostsSortedByDate();
//   const currentIndex = sortedPosts.findIndex(
//     (post) => post.slug === currentSlug,
//   );

//   if (currentIndex === -1 || currentIndex === 0) {
//     return null;
//   }

//   const previousPost = sortedPosts[currentIndex - 1];

//   return previousPost;
// }
