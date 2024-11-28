'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Maximize } from 'lucide-react';
import Image from 'next/image';

interface ImageGalleryProps {
    images: {
        url: string;
        alt: string;
    }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {images.map((image, index) => (
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
                            className="!w-full !h-auto object-cover rounded-lg shadow-lg cursor-pointer"
                            onClick={() => setSelectedImage(image.url)}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center space-x-4">
                            <button
                                onClick={() => setSelectedImage(image.url)}
                                className="hidden p-2 bg-black rounded-full hover:bg-black/70 transition-colors"
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
            </div>
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 "
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="max-w-[500px] max-h-[500px] p-4">
                        <Image
                            src={selectedImage}
                            alt={'image'}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                            className="max-w-full max-h-full object-contain rounded-md"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageGallery;
