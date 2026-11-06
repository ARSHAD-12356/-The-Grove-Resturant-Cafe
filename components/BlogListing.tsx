"use client";

import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import BlogBackdrop from "./BlogBackdrop";
import BlogCard from "./BlogCard";
import { BLOG_POSTS } from "@/data/blogPosts";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BlogListing() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-svh overflow-hidden bg-[#120d06]">
        <BlogBackdrop />
        <div className="relative mx-auto max-w-[104.5rem] px-6 pb-16 pt-5 md:px-10 lg:px-[5.5625rem] lg:pb-[5rem] lg:pt-[1.5rem]">
          <Link
            href="/#blog"
            className="inline-flex min-h-11 items-center gap-2 text-gold-soft transition-colors duration-300 hover:text-white lg:text-[1.05rem]"
          >
            <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
            Back to The Grove
          </Link>
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mt-6 text-center lg:mt-[1.5rem]"
          >
            <p className="text-xs tracking-[0.34em] text-gold lg:text-[1.2rem] lg:tracking-[0.25em]">OUR BLOG</p>
            <h1 className="mt-3 font-display text-[10.4vw] font-normal leading-[1.14] text-white md:text-[3.5rem] lg:mt-[0.9rem] lg:text-[4.4rem]">
              All <em className="text-gold">Articles</em>
            </h1>
          </motion.header>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6 lg:mt-[2.5rem] lg:grid-cols-3 lg:gap-[2.0625rem]">
            {BLOG_POSTS.map((post, index) => (
              <motion.li
                key={post.id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.15 + index * 0.13, ease: EASE }}
              >
                <BlogCard post={post} />
              </motion.li>
            ))}
          </ul>
        </div>
      </main>
    </MotionConfig>
  );
}
