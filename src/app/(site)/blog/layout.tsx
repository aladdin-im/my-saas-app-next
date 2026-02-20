import { RootProvider } from 'fumadocs-ui/provider/next';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <RootProvider>
            {children}
        </RootProvider>
    )
}