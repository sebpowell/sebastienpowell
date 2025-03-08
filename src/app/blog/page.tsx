import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

export default function BlogPage() {
  const posts = getAllPosts()

  console.log(posts)
  
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            {/* <Link href={`/blog/${post.slug}`}>
              <h2>{post.title}</h2>
              <time>{post.date}</time>
            </Link> */}
          </li>
        ))}
      </ul>
    </div>
  )
}