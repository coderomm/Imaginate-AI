'use client'

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, LoaderCircle, Maximize, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { Post } from '@prisma/client';

export default function UserGenImages() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

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

    const downloadImage = async (imageUrl: string) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'generated-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center flex-col-reverse md:flex-row w-full gap-2 mb-6">
                {loading && (
                    <LoaderCircle className="animate-spin" />
                )}
                <h2 className="text-center text-3xl custom-text-color flex items-center justify-center">
                    {loading ? `Loading previous AI generated images...` : '-Your AI generated images-'}
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {!loading && (<AnimatePresence mode="wait">
                    <motion.div
                        className='bg-white/5 animate-pulse rounded-lg p-1'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-full h-full flex flex-col justify-center items-center gap-3 text-white/70 text-center p-3">
                            Enter your prompt and hit generate! <Plus />
                        </div>
                    </motion.div>
                    {posts.map((image, index) => (
                        <motion.div
                            key={index}
                            className={`relative group ${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Image
                                src={image.url}
                                alt={'image'}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }}
                                className="!w-full !h-auto object-cover rounded-t-lg md:rounded-lg shadow-lg cursor-pointer"
                                onClick={() => setSelectedImage(image.url)}
                            />
                            <div className="absolute inset-0 bg-transparent top-[85%] md:top-0 md:bg-black md:bg-opacity-50 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center space-x-4">
                                <button
                                    onClick={() => setSelectedImage(image.url)}
                                    className="p-2 bg-black rounded-full hover:bg-black/70 transition-colors hidden md:block"
                                    title="View full image"
                                >
                                    <Maximize className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => downloadImage(image.url)}
                                    className="p-2 bg-black rounded-full hover:bg-black/70 transition-colors"
                                    title="Download image"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                )}
            </div>
            {selectedImage && (
                // <div
                //     className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 "
                //     onClick={() => setSelectedImage(null)}
                // >
                //     <div className="w-[500px] h-auto p-4"
                //         onClick={(e) => e.stopPropagation()}>
                //         <Image
                //             src={selectedImage}
                //             alt={'image'}
                //             width={0}
                //             height={0}
                //             sizes="100vw"
                //             style={{ width: '100%', height: 'auto' }}
                //             className="max-w-full max-h-full object-contain rounded-md"
                //         />
                //     </div>
                // </div>
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 overflow-y-auto p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-w-full max-h-full flex flex-col items-center justify-center"
                        // Prevent click propagation to avoid closing when clicking on image container
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-0 right-0 mt-2 mr-2 bg-white/20 hover:bg-white/40 rounded-full p-2 z-10"
                        >
                            <X className="text-white" />
                        </button>

                        <Image
                            src={selectedImage}
                            alt={'Full screen image'}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                                width: 'auto',
                                height: 'auto',
                                maxWidth: '100%',
                                maxHeight: '90vh'
                            }}
                            className="object-contain rounded-md shadow-2xl"
                        />

                        {/* Optional: Download button */}
                        <button
                            onClick={() => downloadImage(selectedImage)}
                            className="mt-4 bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full flex items-center space-x-2"
                        >
                            <Download className="w-5 h-5" />
                            <span>Download</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
