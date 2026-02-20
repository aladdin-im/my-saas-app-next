import { Page } from 'fumadocs-core/source';
import { Metadata } from 'next';
import { siteConfig } from './site';

// SEO 配置
const seoConfig = {
    title: siteConfig.name,
    description: "NextJS FumaDocs App Demo",
    keywords: [],
} as const;

// 默认 metadata
export const defaultMetadata: Metadata = {
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords.join(', '),
    alternates: {
        canonical: `${siteConfig.url}/`,
    },
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,

    // Open Graph
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: `${siteConfig.url}/`,
        siteName: siteConfig.name,
        title: seoConfig.title,
        description: seoConfig.description,
        images: [
            {
                url: `${siteConfig.url}/og-image.png`,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },

    // Twitter
    twitter: {
        card: 'summary_large_image',
        title: seoConfig.title,
        description: seoConfig.description,
        images: [`${siteConfig.url}/og-image.png`],
        creator: '@nextjs-fumadocs-app', // 你的 Twitter handle
    },

    // 其他
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },

    manifest: '/site.webmanifest',
};

// 首页 metadata 生成函数
export function generateHomeMetadata(): Metadata {
    return {
        ...defaultMetadata,
        alternates: {
            canonical: `${siteConfig.url}/`,
        },
    };
}

// 博客列表页面 metadata 生成函数
export function generateBlogMetadata(): Metadata {
    return {
        ...defaultMetadata,
        title: 'Blog',
        description: 'Blog',
        alternates: {
            canonical: `${siteConfig.url}/blog`,
        },
    };
}

// 博客文章页面 metadata 生成函数
export function generateBlogPostMetadata(page: Page): Metadata {
    return {
        ...defaultMetadata,
        title: page.data.title,
        description: page.data.description,
        alternates: {
            canonical: `${siteConfig.url}${page.url}`,
        },
    };
}

// 隐私政策页面 metadata 生成函数
export function generatePrivacyPolicyMetadata(page: Page): Metadata {
    return {
        ...defaultMetadata,
        title: page.data.title,
        description: page.data.description,
        alternates: {
            canonical: `${siteConfig.url}${page.url}`,
        },
    };
}

// 服务条款页面 metadata 生成函数
export function generateTermsOfServiceMetadata(page: Page): Metadata {
    return {
        ...defaultMetadata,
        title: page.data.title,
        description: page.data.description,
        alternates: {
            canonical: `${siteConfig.url}${page.url}`,
        },
    };
}