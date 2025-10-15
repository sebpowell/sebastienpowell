import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface PostBase {
  title: string;
  date: string;
  slug: string;
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
}

export interface Post extends PostBase {
  previousPost: PostBase | null;
  nextPost: PostBase | null;
}
