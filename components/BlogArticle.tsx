"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import BlogBackdrop from "./BlogBackdrop";
import BlogCard from "./BlogCard";
import BlogMetadata from "./BlogMetadata";
import { BLOG_POSTS, getBlogPost } from "@/data/blogPosts";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Takes the slug rather than the post, because post data holds an icon component. */
export default function BlogArticle({ slug }: { slug: string }) {
  const post = getBlogPost(slug);
  if (!post) return null;

  const Icon = post.icon;
  const related = BLOG_POSTS.filter((other) => other.slug !== slug).slice(0, 2);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-svh overflow-hidden bg-[#120d06]">
        <BlogBackdrop />
        <div className="relative mx-auto max-w-[104.5rem] px-6 pb-16 pt-5 md:px-10 lg:px-[5.5625rem] lg:pb-[5rem] lg:pt-[1.5rem]">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 text-gold-soft transition-colors duration-300 hover:text-white lg:text-[1.05rem]"
          >
            <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
            Back to Blog
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mx-auto mt-5 max-w-[48rem] lg:mt-[1.25rem]"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/80 px-3.5 py-1.5 text-sm text-[#f8eeda] lg:gap-[0.6rem] lg:px-[1.1rem] lg:py-[0.5rem] lg:text-[1.1rem]">
              <Icon aria-hidden="true" strokeWidth={1.6} className="size-4 text-gold-soft lg:size-[1.25rem]" />
              {post.category}
            </p>
            <h1 className="mt-4 font-display text-[2.375rem] font-normal leading-[1.14] text-white md:text-[3.25rem] lg:mt-[1.1rem] lg:text-[3.75rem]">
              {post.title}
            </h1>
            <BlogMetadata post={post} className="mt-4 lg:mt-[1.1rem]" />

            <div
              className="relative mt-6 overflow-hidden rounded-[1.25rem] border border-[#d4b283]/75 lg:mt-[1.75rem]"
              style={{ aspectRatio: post.image.width / post.image.height }}
            >
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                priority
                unoptimized
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-cover"
              />
            </div>

            <p className="mt-6 text-lg leading-[1.65] text-white lg:mt-[1.75rem] lg:text-[1.4rem] lg:leading-[2.1rem]">
              {post.introduction}
            </p>

            {post.content.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={index}
                    className="mt-8 font-display text-[1.75rem] font-normal leading-tight text-gold-soft lg:mt-[2.25rem] lg:text-[2.25rem]"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "image") {
                return (
                  <div
                    key={index}
                    className="relative mt-6 overflow-hidden rounded-[1rem] border border-gold/40 lg:mt-[1.75rem]"
                    style={{ aspectRatio: block.width / block.height }}
                  >
                    <Image
                      src={block.src}
                      alt={block.alt}
                      fill
                      unoptimized
                      sizes="(min-width: 768px) 48rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                );
              }
              return (
                <p key={index} className="mt-3 text-base leading-[1.7] text-[#d8d3c9] lg:mt-[0.75rem] lg:text-[1.2rem] lg:leading-[1.95rem]">
                  {block.text}
                </p>
              );
            })}
          </motion.article>

          <section aria-labelledby="related-heading" className="mt-12 border-t border-gold/20 pt-8 lg:mt-[4rem] lg:pt-[2.5rem]">
            <h2
              id="related-heading"
              className="text-center font-display text-[2rem] font-normal text-white lg:text-[2.75rem]"
            >
              Related <em className="text-gold">Articles</em>
            </h2>
            <ul className="mx-auto mt-6 grid max-w-[66rem] gap-5 md:grid-cols-2 md:gap-6 lg:mt-[2rem] lg:gap-[2.0625rem]">
              {related.map((other) => (
                <li key={other.id}>
                  <BlogCard post={other} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </MotionConfig>
  );
}
