'use client'

import CreateAction from "@/components/CreateAction";
import ImageGallery from "@/components/ImageGallery";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { featuredImages1, featuredImages2, featuredImages3, featuredImages4, featuredImagesSingles } from "@/lib/featuredImages";
import { motion } from "motion/react"

export default function Home() {
  return (
    <>
      <section className="__mainLanding h-[60vh] md:h-[70vh] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-start justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex justify-center items-center flex-col">
          <motion.h1
            initial={{
              opacity: 0,
              scale: 0.95,
              filter: 'blur(10px)'
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)'
            }}
            transition={{ duration: 0.35 }}
            className="text-3xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
            Creativity, Unleashed</motion.h1>

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
          custom-text-color"
          >Leverage generative AI with a unique suite of tools to convey your ideas to the world.
          </motion.h1>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.35, delay: 0.7 }}
            className="flex items-center justify-center mt-6">
            <CreateAction />
          </motion.div>
        </div>
      </section>

      <section className="__featuredHeroImages py-3 max-w-[80%] md:max-w-full mx-auto">
        <AnimatedTestimonials testimonials={featuredImagesSingles} autoplay={true} />
      </section>

      <section className="__imageGallery h-auto w-full px-4 py-4 md:px-24 md:py-8 dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex flex-col items-center justify-center">
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
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto
          custom-text-color relative"
        >
          Our few magical creations
        </motion.h1>

        <div className="flex flex-col items-center justify-center gap-4 border-b custom-border-color pb-4">
          <TextGenerateEffect className="text-white/60 text-base" words={featuredImages1[0].alt} />
          <ImageGallery images={featuredImages1} />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 border-b custom-border-color pb-4">
          <TextGenerateEffect className="text-white/60 text-base" words={featuredImages2[0].alt} />
          <ImageGallery images={featuredImages2} />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 border-b custom-border-color pb-4">
          <TextGenerateEffect className="text-white/60 text-base" words={featuredImages3[0].alt} />
          <ImageGallery images={featuredImages3} />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 border-b custom-border-color pb-4">
          <TextGenerateEffect className="text-white/60 text-base" words={featuredImages4[0].alt} />
          <ImageGallery images={featuredImages4} />
        </div>
      </section >
    </>
  );
}
