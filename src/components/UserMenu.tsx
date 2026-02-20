"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { useAvailableCredits } from "@/hooks/useAvailableCredits"
import { authClient } from "@/lib/auth-client"
import { CreditCard, FileImage, LogOut, Settings, ShieldAlert, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

const UserMenu = () => {
    const router = useRouter()
    const { data: session, isPending } = authClient.useSession()

    // 获取用户积分
    // const { credits, loading: loadingCredits, error, refresh } = useAvailableCredits(session?.user?.id)

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/")
                    router.refresh()
                }
            }
        })
    }

    // 加载中状态
    if (isPending) {
        return (
            <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        )
    }

    // 未登录：显示登录按钮
    if (!session) {
        return (
            <Link href="/sign-in">
                <Button size="sm">
                    Sign In
                </Button>
            </Link>
        )
    }

    // 已登录：显示积分 + 用户菜单
    const user = session.user

    return (
        <div className="flex items-center gap-3">
            {/* 积分显示按钮 */}
            {/* <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    if (error) {
                        refresh()  // 如果有错误，点击重试
                    } else {
                        router.push("/settings/credits")  // 否则跳转到设置页
                    }
                }}
                className="gap-1.5"
            >
                {error ? (
                    <RefreshCw className="h-4 w-4" />
                ) : (
                    <Coins className="h-4 w-4" />
                )}
                <span className="font-medium">
                    {loadingCredits ? "..." : error ? "Retry" : credits?.toLocaleString() ?? "0"}
                </span>
            </Button> */}

            {/* 用户菜单 */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
                        <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/settings/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings/credits")}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings/tasks")}>
                        <FileImage className="mr-2 h-4 w-4" />
                        Usage
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings/credits")}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {user.role === 'admin' && (
                        <>
                            <DropdownMenuItem onClick={() => router.push("/settings/admin/dashboard")}>
                                <ShieldAlert className="mr-2 h-4 w-4" />
                                Admin Dashboard
                            </DropdownMenuItem>
                        </>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserMenu;