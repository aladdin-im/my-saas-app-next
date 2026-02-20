import { blog } from '@/lib/source';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPage() {
    const posts = blog.getPages();

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* 页面标题 */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
                <p className="text-lg text-fd-muted-foreground">
                    Read about our latest product features, solutions, and updates.
                </p>
            </div>

            {/* 博客文章网格 */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <Link
                        key={post.url}
                        href={post.url}
                        className="group block rounded-xl overflow-hidden border border-fd-border bg-fd-card hover:shadow-lg transition-all duration-300"
                    >
                        {/* 封面图片 */}
                        <div className="relative aspect-video overflow-hidden bg-fd-muted">
                            {post.data.image && (
                                <Image
                                    src={post.data.image}
                                    alt={post.data.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            )}
                        </div>

                        {/* 文章内容 */}
                        <div className="p-6">
                            {/* 标题 */}
                            <h2 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-fd-primary transition-colors">
                                {post.data.title}
                            </h2>

                            {/* 描述 */}
                            <p className="text-fd-muted-foreground line-clamp-3 text-sm">
                                {post.data.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}