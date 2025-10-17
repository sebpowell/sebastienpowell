export interface PostBase {
  title: string;
  date: string;
  slug: string;
  source: string;
}

export interface Post extends PostBase {
  previousPost: PostBase | null;
  nextPost: PostBase | null;
}
