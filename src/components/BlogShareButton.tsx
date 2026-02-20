'use client';

import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

interface BlogShareButtonProps {
    title: string;
    description?: string;
}

export function BlogShareButton({ title, description }: BlogShareButtonProps) {
    const handleShare = async () => {
        // 如果浏览器支持原生分享 API（主要是移动设备）
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description,
                    url: window.location.href,
                });
            } catch (error) {
                // 用户取消分享或发生错误
                console.log('Share cancelled');
            }
        } else {
            // 降级方案：复制链接到剪贴板（桌面设备）
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            } catch (error) {
                console.error('Failed to copy:', error);
            }
        }
    };

    return (
        <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="gap-2"
        >
            <Share2 className="w-4 h-4" />
            Share This Post
        </Button>
    );
}
