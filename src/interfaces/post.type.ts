import { ComponentType } from "react";

export interface PostBase {
  title: string;
  date: string;
  slug: string;
  source: ComponentType<{}>,
  tags?: string[];
  capabilities?: string[];
}

export interface Post extends PostBase {
  previousPost: PostBase | null;
  nextPost: PostBase | null;
}
