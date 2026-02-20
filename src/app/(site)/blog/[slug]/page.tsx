import { BlogShareButton } from '@/components/BlogShareButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { blog } from '@/lib/source';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams(): { slug: string }[] {
    return blog.getPages().map((page) => ({
        slug: page.slugs[0],
    }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const page = blog.getPage([params.slug]);
    if (!page) notFound();
    return {
        title: page.data.title,
        description: page.data.description,
    };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const page = blog.getPage([params.slug]);

    if (!page) notFound();
    const Mdx = page.data.body;

    return (
        <div className='max-w-3xl mx-auto px-4 py-12'>
            {/* 返回导航链接 - 服务端渲染，利于 SEO */}
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
            </Link>

            {/* 博客标题 */}
            <h1 className="mb-8 text-4xl font-bold">{page.data.title}</h1>

            {/* 作者信息区域：头像和作者名称、发布日期 */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Avatar size="lg">
                        {page.data.avatar && (
                            <AvatarImage
                                src={page.data.avatar}
                                alt={page.data.author || 'Author'}
                            />
                        )}
                        <AvatarFallback>
                            {page.data.author?.charAt(0).toUpperCase() || 'A'}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium text-base">{page.data.author}</p>
                        <p className="text-sm text-fd-muted-foreground">
                            {new Date(page.data.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                {/* 分享按钮 - 客户端交互 */}
                <BlogShareButton title={page.data.title} description={page.data.description} />
            </div>

            {/* 文章封面图片 */}
            {page.data.image && (
                <div className="mb-8 rounded-lg overflow-hidden">
                    <Image
                        src={page.data.image}
                        alt={page.data.title}
                        width={1200}
                        height={630}
                        className="w-full h-auto object-cover"
                        priority
                    />
                </div>
            )}

            {/* 目录导航 */}
            <div className="mb-8">
                <InlineTOC items={page.data.toc} />
            </div>

            {/* 文章正文内容 */}
            <article className="prose prose-neutral dark:prose-invert max-w-none">
                <Mdx components={defaultMdxComponents} />
            </article>
        </div>
    )
}