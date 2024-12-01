'use client'

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Home } from "lucide-react";
import { motion } from "motion/react"
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <section className="__imageGallery min-h-dvh w-full px-4 py-4 md:px-24 md:py-8 dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex flex-col items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex flex-col items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-6xl text-white/90"
        >404</motion.h1>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto
          custom-text-color relative"
        >
          The page you&apos;re looking for doesn’t exist or has been moved.
        </motion.h1>
        <Link href={'/'} className="flex items-center mt-4" aria-label="Back to Homepage">
          <HoverBorderGradient
            containerClassName="rounded-full bg-transparent"
            as="button"
            className="text-white flex items-center space-x-2 w-full md:w-auto bg-transparent">
            <span className="flex justify-center items-center gap-2 w-auto text-white">
              Back to Homepage <Home className="w-6 h-6" />
            </span>
          </HoverBorderGradient>
        </Link>
      </section >
    </>
  );
}