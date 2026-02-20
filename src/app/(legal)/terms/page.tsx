import { generateTermsOfServiceMetadata } from '@/config/index';
import { legal } from '@/lib/source';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
    const page = legal.getPage(['terms']);
    if (!page) notFound();
    return generateTermsOfServiceMetadata(page);
}

export default function TermsPage() {
    const page = legal.getPage(['terms']);

    if (!page) notFound();
    const Mdx = page.data.body;

    return (
        <div className='max-w-4xl mx-auto px-4 py-12'>
            {/* 页面标题 */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">{page.data.title}</h1>
                <p className="text-fd-muted-foreground">
                    Last updated: {new Date(page.data.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>

            {/* 文章正文内容 */}
            <article className="prose prose-neutral dark:prose-invert max-w-none">
                <Mdx components={defaultMdxComponents} />
            </article>
        </div>
    );
}
