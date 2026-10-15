import type { Metadata } from 'next'
import { type JSXConvertersFunction, RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Arrow } from '@/components/Arrow'
import { coverOf, formatDate, getPost, getPosts, headingsOf, readingTime, type RichNode, slugify, textOf } from '@/lib/posts'

// Saving a post in the CMS refreshes its page straight away
export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  const cover = coverOf(post)
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: { type: 'article', images: cover?.url ? [cover.url] : undefined },
  }
}

// Section headings get an id, so the "In this article" links can jump to them
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag
    return <Tag id={slugify(textOf(node as RichNode))}>{nodesToJSX({ nodes: node.children })}</Tag>
  },
})

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const cover = coverOf(post)
  const headings = headingsOf(post)

  return (
    <article>
      {/* ========== Title over the cover ========== */}
      <header className="hero hero--post on-dark">
        <div className="hero__media" aria-hidden="true">
          {cover && <Image className="hero__poster" src={cover.url!} alt="" fill priority sizes="100vw" />}
        </div>
        <div className="hero__shade" aria-hidden="true" />
        <div className="wrap hero__inner">
          {post.topic && (
            <p className="eyebrow" data-enter>
              {post.topic}
            </p>
          )}
          <h1 className="title" data-enter>
            {post.title}
          </h1>
          <p className="post__meta label-sm" data-enter>
            {[formatDate(post.publishedAt), `${readingTime(post)} min read`].filter(Boolean).join(' · ')}
          </p>
        </div>
      </header>

      {/* ========== Body ========== */}
      <div className="sec sec--post on-light">
        <div className="wrap post">
          <div className="prose">
            {post.excerpt && <p className="prose__lede">{post.excerpt}</p>}
            {post.content && <RichText data={post.content} converters={converters} />}
          </div>

          <aside className="post__aside">
            {headings.length > 0 && (
              <nav className="toc" aria-label="In this article">
                <span className="label-sm">In this article</span>
                <ol>
                  {headings.map(({ id, text }) => (
                    <li key={id}>
                      <a href={`#${id}`}>{text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="post__cta glass">
              <span className="label-sm">Carbon credits</span>
              <p>Permanent removal, made with smallholder farmers.</p>
              <Link className="btn" href="/enquire">
                Enquire <Arrow />
              </Link>
            </div>
          </aside>
        </div>

        <div className="wrap">
          <Link className="link post__back" href="/blog">
            All posts <Arrow />
          </Link>
        </div>
      </div>
    </article>
  )
}
