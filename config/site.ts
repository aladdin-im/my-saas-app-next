export const siteConfig = {
    name: "My SaaS App Next",
    domain: "my-saas-app-next.com",
    url: "https://my-saas-app-next.com",

    // 联系信息
    contact: {
        email: "contact@my-saas-app-next.com",
    },

    // 社交媒体
    social: {
        twitter: "https://twitter.com/my-saas-app-next",
        facebook: "https://facebook.com/my-saas-app-next",
    },
} as const;

export type SiteConfig = typeof siteConfig;