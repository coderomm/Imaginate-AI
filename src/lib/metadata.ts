import { Metadata } from 'next';

export const baseMetadata: Metadata = {
    metadataBase: new URL('https://ai-imaginate.vercel.app'),
    title: {
        default: 'Imaginate - Free AI Image Generator | Create Stunning Visuals Instantly',
        template: '%s | Imaginate AI'
    },
    description: 'Unleash your creativity with Imaginate - a free AI-powered image generation tool. Transform text prompts into stunning, unique images in seconds. No cost, pure imagination!',
    keywords: [
        'AI image generator', 
        'free image creation', 
        'text to image', 
        'AI art', 
        'image generation', 
        'creative AI tool', 
        'digital art creator'
    ],
    authors: [{ name: 'Om Sharma' }],
    creator: 'Om Sharma',
    publisher: 'Imaginate AI',
    
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://ai-imaginate.vercel.app',
        title: 'Imaginate - Free AI Image Generator',
        description: 'Unleash your creativity with Imaginate - a free AI-powered image generation tool. Transform text prompts into stunning, unique images in seconds.',
        siteName: 'Imaginate',
        images: [
            {
                url: '/og-image.png',
                width: 1349,
                height: 767,
                alt: 'Imaginate AI - Create Amazing Images with AI'
            }
        ]
    },
    
    twitter: {
        card: 'summary_large_image',
        title: 'Imaginate AI - Free AI Image Generator',
        description: 'Unleash your creativity with Imaginate - a free AI-powered image generation tool. Transform text prompts into stunning, unique images in seconds.',
        creator: '@1omsharma', // Replace with your Twitter handle
        images: ['/og-image.png']
    },
    
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    
    verification: {
        google: 'your-google-site-verification-code', // Optional: Add your Google Search Console verification code
        // yandex: 'your-yandex-verification-code', // Optional
        // bing: 'your-bing-verification-code', // Optional
    },
    
    alternates: {
        canonical: 'https://ai-imaginate.vercel.app'
    },
    
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon.webp', sizes: '180x180', type: 'image/png' },
            { url: '/favicon.webp', sizes: '180x180', type: 'image/png' }
        ],
        apple: [
            { url: '/favicon.webp' }
        ]
    },
    
    other: {
        'msapplication-TileColor': '#000000',
        'theme-color': '#000000'
    }
};

// Page-specific metadata
export const generateImageMetadata: Metadata = {
    title: 'Generate AI Images | Imaginate',
    description: 'Create unique, stunning AI-generated images with just a text prompt. Fast, free, and incredibly creative.',
    openGraph: {
        ...baseMetadata.openGraph,
        title: 'Generate AI Images | Imaginate',
        description: 'Create unique, stunning AI-generated images with just a text prompt. Fast, free, and incredibly creative.'
    },
    twitter: {
        ...baseMetadata.twitter,
        title: 'Generate AI Images | Imaginate'
    }
};

// Jsonld Structured Data
export const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Imaginate AI',
    'url': 'https://ai-imaginate.vercel.app',
    'description': 'Free AI-powered image generation tool',
    'applicationCategory': 'Multimedia',
    'operatingSystem': 'All',
    'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
    }
};