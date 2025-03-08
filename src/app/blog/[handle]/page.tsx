import { Markdown } from '@/components/elements/Markdown'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function PostPage({ params }: { params: { handle: string } }) {
  const post = getPostBySlug(params.handle)
  
  if (!post) {
    notFound()
  }

  return (
    <article>
      <div>Blog</div>
      <h1 className='text-3xl font-bold text-text-strong'>{post.title}</h1>
      <time className='text-sm'>{post.date}</time>

      <div className='my-12 border-t' />
      
      <Markdown content={post.content} />
      <div>Prev / next</div>
      Share
    </article>
  )
}