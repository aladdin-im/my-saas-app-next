import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RootProvider } from "fumadocs-ui/provider/next";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <RootProvider>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </RootProvider>
    );
}