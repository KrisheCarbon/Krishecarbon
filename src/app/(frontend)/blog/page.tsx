import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { coverOf, formatDate, getPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights from KriSHE Carbon on carbon sequestration, biochar, carbon markets, soil and field implementation.',
}

// Saving a post in the CMS refreshes this page straight away
export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <section className="sec sec--top on-light">
      <div className="wrap">
        <p className="eyebrow" data-reveal>
          Blog
        </p>
        <h1 className="title" data-reveal>
          Ideas, evidence and lessons <em>from the field.</em>
        </h1>

        {posts.length === 0 ? (
          <p className="posts__empty" data-reveal>
            Nothing published yet. Check back soon.
          </p>
        ) : (
          <ul className="posts">
            {posts.map((post, i) => {
              const cover = coverOf(post)
              return (
                <li key={post.id} data-reveal style={{ '--i': i % 3 } as CSSProperties}>
                  <Link className="post-card" href={`/blog/${post.slug}`}>
                    <span className="post-card__cover">
                      {cover && (
                        <Image
                          src={cover.url!}
                          alt={cover.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
                        />
                      )}
                    </span>
                    <span className="post-card__meta label-sm">
                      {[post.topic, formatDate(post.publishedAt)].filter(Boolean).join(' · ')}
                    </span>
                    <span className="post-card__title">{post.title}</span>
                    {post.excerpt && <span className="post-card__excerpt">{post.excerpt}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
