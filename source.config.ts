import { defineCollections } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const legalPages = defineCollections({
    type: 'doc',
    dir: 'content/legal',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(), // 日期字符串，YYYY-MM-DD
    }),
});

export const blogPosts = defineCollections({
    type: 'doc',
    dir: 'content/blog',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        author: z.string(),
        avatar: z.string(),
        date: z.string(), // 日期字符串，YYYY-MM-DD
    }),
});