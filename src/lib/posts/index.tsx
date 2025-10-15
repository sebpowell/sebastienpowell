import fs from "fs";
import path from "path";
import { sortBy } from "remeda";
import { Post } from "@/interfaces/post.type";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote-client/serialize";


const postsDirectory = path.join(process.cwd(), "src/content/posts");
const fileExtension = ".mdx";

export async function getPostMetadata(filePath: string): Promise<Frontmatter> {
  const markdownWithMeta = fs.readFileSync(filePath, "utf8");

  const { data } = matter(markdownWithMeta);

  return data;
}

function getSlugFromFilename(filename: string) {
  return filename.replace(/\.mdx$/, "");
}

export async function getAllPosts(): Promise<Pick<Post, "title" | "slug">[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const files = fileNames.filter((fileName) =>
    fileName.endsWith(fileExtension),
  );

  const posts = await Promise.all(
    files.map(async (fileName) => {
      const slug = getSlugFromFilename(fileName);

      const fullPath = path.join(postsDirectory, fileName);

      const metadata = await getPostMetadata(fullPath);

      return {
        ...metadata,
        slug,
      };
    }),
  );

  return posts;
}



export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}${fileExtension}`);

    const markdownWithMeta = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(markdownWithMeta);

  


    const source = "Some **bold text** in MDX, with a component <Test />";

  const mdxSource = await serialize({source});

  
  
    // const previousPost = getPreviousPost(slug);
    // const nextPost = getNextPost(slug);

    return {
      ...data,
      slug,
      source: markdownWithMeta,
      previousPost: null,
      nextPost: null,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPostsSortedByDate(): Promise<Post[]> {
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
