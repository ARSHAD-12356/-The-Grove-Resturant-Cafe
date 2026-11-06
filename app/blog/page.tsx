import type { Metadata } from "next";
import BlogListing from "@/components/BlogListing";

export const metadata: Metadata = {
  title: "Blog | The Grove",
  description: "Dining tips, culinary stories, seasonal specials, and a behind-the-scenes look at life at The Grove.",
};

export default function BlogPage() {
  return <BlogListing />;
}
