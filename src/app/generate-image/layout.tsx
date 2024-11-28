import { generateImageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateImageMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}