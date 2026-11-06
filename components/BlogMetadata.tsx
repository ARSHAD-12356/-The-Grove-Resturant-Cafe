import { CalendarDays, Clock } from "lucide-react";
import { formatBlogDate, type BlogPost } from "@/data/blogPosts";

export default function BlogMetadata({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#e4dfd5] lg:gap-x-[1.25rem] lg:text-[1.05rem] ${className ?? ""}`}>
      <span className="flex items-center gap-1.5 lg:gap-[0.5rem]">
        <CalendarDays aria-hidden="true" strokeWidth={1.5} className="size-4 text-gold lg:size-[1.25rem]" />
        <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
      </span>
      <span aria-hidden="true" className="h-4 w-px bg-gold/60 lg:h-[1.25rem]" />
      <span className="flex items-center gap-1.5 lg:gap-[0.5rem]">
        <Clock aria-hidden="true" strokeWidth={1.5} className="size-4 text-gold lg:size-[1.3rem]" />
        {post.readingTime}
      </span>
    </p>
  );
}
