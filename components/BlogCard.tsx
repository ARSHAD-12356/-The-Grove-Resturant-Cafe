import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogMetadata from "./BlogMetadata";
import type { BlogPost } from "@/data/blogPosts";

/** Hover brightens the border and zooms the photo only, so the card itself never moves under the cursor. */
export default function BlogCard({ post }: { post: BlogPost }) {
  const href = `/blog/${post.slug}`;
  const Icon = post.icon;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#d4b283]/75 bg-[#140e07] shadow-[0_0.5rem_1.5rem_rgb(180_130_60/0.06)] transition-[border-color,box-shadow] duration-500 hover:border-gold-soft hover:shadow-[0_0_1.5rem_rgb(232_184_113/0.2)] lg:rounded-[1.4rem]">
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden border-b border-gold/15 lg:aspect-auto lg:h-[16rem]">
        <Link href={href} tabIndex={-1} aria-hidden="true" className="absolute inset-0 block">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            unoptimized
            loading="eager"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </Link>
        <span className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full border border-gold/80 bg-[#120c06]/80 px-3.5 py-1.5 text-sm text-[#f8eeda] lg:left-[1.2rem] lg:top-[1.1rem] lg:gap-[0.6rem] lg:px-[1.15rem] lg:py-[0.55rem] lg:text-[1.15rem] lg:leading-none">
          <Icon aria-hidden="true" strokeWidth={1.6} className="size-4 text-gold-soft lg:size-[1.3rem]" />
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 lg:px-[2.375rem] lg:pb-[1.44rem] lg:pt-[1.2rem]">
        <BlogMetadata post={post} />
        <h3 className="mt-3 text-[1.375rem] font-normal leading-[1.3] text-white lg:mt-[0.9rem] lg:max-w-[22.5rem] lg:text-[1.84rem] lg:leading-[2.3rem]">
          <Link href={href} className="transition-colors duration-300 hover:text-gold-soft">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[#d8d3c9] lg:mt-[0.45rem] lg:text-[1.207rem] lg:leading-[1.625rem]">
          {post.description}
        </p>
        <Link
          href={href}
          aria-label={`Read more: ${post.title}`}
          className="group/link mt-auto inline-flex min-h-11 items-center gap-2.5 self-start pt-3 text-base text-gold-soft transition-colors duration-300 hover:text-white lg:gap-[0.8rem] lg:pt-[1.25rem] lg:text-[1.31rem]"
        >
          Read More
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-5 transition-transform duration-300 group-hover/link:translate-x-1 lg:size-[1.4rem]"
          />
        </Link>
      </div>
    </article>
  );
}
