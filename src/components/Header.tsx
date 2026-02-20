import ModeToggle from "@/components/ModeToggle";
import { siteConfig } from "@/config/index";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "./UserMenu";

// 导航链接配置
const navLinks = [
    { href: "/#features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
];

const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-14 items-center justify-between">
                    {/* 左侧：Logo 和标题 */}
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                            <span className="text-lg font-semibold">{siteConfig.name}</span>
                        </Link>

                        {/* 中间：导航链接（桌面端显示） */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* 右侧：用户菜单 + 主题切换 */}
                    <div className="flex items-center gap-2">
                        {/* 用户菜单 */}
                        <UserMenu />

                        {/* 主题切换 */}
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;