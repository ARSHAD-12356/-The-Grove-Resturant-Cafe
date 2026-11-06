import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/BlogArticle";
import { BLOG_POSTS, getBlogPost } from "@/data/blogPosts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  return post ? { title: `${post.title} | The Grove`, description: post.description } : {};
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  if (!getBlogPost(slug)) notFound();
  return <BlogArticle slug={slug} />;
}
