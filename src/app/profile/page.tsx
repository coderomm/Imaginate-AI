"use client";

import { Post } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page() {
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/image");
            const data = await response.json();
            console.log(data);
            setPosts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="w-full min-h-dvh p-3 pt-[72px] grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
            {loading ? (
                <div className="col-span-full flex justify-center items-center">
                    <LoaderCircle className="animate-spin" />
                </div>
            ) : (
                <>
                    <h1 className="col-span-full text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 custom-text-color w-full p-3 custom-text-color mb-4">
                        -Your Images-
                    </h1>
                    <AnimatePresence mode="wait">
                        {posts.map((post, index) => {
                            return (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    transition={{ duration: 0.2, delay: index * 0.1 }}
                                    className="w-full h-fit border rounded-md p-2.5"
                                    key={post.id}
                                >
                                    <Image
                                        alt={post.prompt}
                                        src={post.url}
                                        width={250}
                                        height={250}
                                        className="object-contain w-full rounded-md"
                                    />
                                    <p className="text-white/80">{post.prompt}</p>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
}