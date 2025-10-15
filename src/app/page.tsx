import { HomePage } from "@/components/pages/Home";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const articles = await getAllPosts();

  return <HomePage articles={articles} />;
}
