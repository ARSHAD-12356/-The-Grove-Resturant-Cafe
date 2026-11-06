import type { Metadata } from "next";
import FullGallery from "@/components/FullGallery";

export const metadata: Metadata = {
  title: "Gallery | The Grove",
  description: "Explore the moments, flavors, and ambience that make The Grove a truly special dining destination.",
};

export default function GalleryPage() {
  return <FullGallery />;
}
