import fs from "fs";
import path from "path";
import { sortBy } from "remeda";
import { Post } from "@/interfaces/post.type";
import matter from "gray-matter";

function isValidPostMetadata(data: any): data is Pick<Post, "title" | "date"> {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.title === "string" &&
    typeof data.date === "string"
  );
}

const postsDirectory = path.join(process.cwd(), "src/content/posts");
const fileExtension = ".mdx";

export async function getPostMetadata(
  filePath: string,
): Promise<Pick<Post, "title" | "date">> {
  try {
    const markdownWithMeta = fs.readFileSync(filePath, "utf8");

    const { data } = matter(markdownWithMeta);

    if (!isValidPostMetadata(data)) {
      throw new Error(
        `Invalid frontmatter in ${filePath}. Expected title and date fields.`,
      );
    }

    return {
      title: data.title,
      date: data.date,
    };
  } catch (error) {
    console.error(`Error getting post metadata for ${filePath}:`, error);
    throw error;
  }
}

function getSlugFromFilename(filename: string) {
  return filename.replace(/\.mdx$/, "");
}

function getFullPathFromSlug(slug: string) {
  return path.join(postsDirectory, `${slug}${fileExtension}`);
}

export async function getAllPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(postsDirectory);

  const files = fileNames.filter((fileName) =>
    fileName.endsWith(fileExtension),
  );

  const posts = await Promise.all(
    files.map(async (fileName) => {
      const slug = getSlugFromFilename(fileName);

      const fullPath = getFullPathFromSlug(slug);

      const metadata = await getPostMetadata(fullPath);

      const markdownWithMeta = fs.readFileSync(fullPath, "utf8");

      return {
        ...metadata,
        slug,
        source: markdownWithMeta,
        previousPost: null,
        nextPost: null,
      };
    }),
  );

  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = getFullPathFromSlug(slug);

    const markdownWithMeta = fs.readFileSync(fullPath, "utf8");

    const [metadata, previousPost, nextPost] = await Promise.all([
      getPostMetadata(fullPath),
      getPreviousPost(slug),
      getNextPost(slug),
    ]);

    return {
      ...metadata,
      slug,
      source: markdownWithMeta,
      previousPost,
      nextPost,
    };
  } catch (error) {
    return null;
  }
}

export async function getAllPostsSortedByDate() {
  const posts = await getAllPosts();

  return sortBy(posts, (post) => post.date);
}

export async function getNextPost(currentSlug: string): Promise<Post | null> {
  const sortedPosts = await getAllPostsSortedByDate();

  const currentIndex = sortedPosts.findIndex(
    (post) => post.slug === currentSlug,
  );

  if (currentIndex === -1 || currentIndex === sortedPosts.length - 1) {
    return null;
  }

  const nextPost = sortedPosts[currentIndex + 1];

  return nextPost;
}

export async function getPreviousPost(
  currentSlug: string,
): Promise<Post | null> {
  const sortedPosts = await getAllPostsSortedByDate();
  const currentIndex = sortedPosts.findIndex(
    (post) => post.slug === currentSlug,
  );

  if (currentIndex === -1 || currentIndex === 0) {
    return null;
  }

  const previousPost = sortedPosts[currentIndex - 1];

  return previousPost;
}
