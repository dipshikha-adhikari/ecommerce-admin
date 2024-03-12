/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        BASE_URL: process.env.BASE_URL,
    },
    images: {
        remotePatterns: [{
            hostname: "tshirtstore.centracdn.net"
        }, {
            hostname: "m.media-amazon.com"
        }, {
            hostname: "oxfordpennant.com"
        },
        {
            hostname: "encrypted-tbn0.gstatic.com"
        },
        {
            hostname: "cdn.shopify.com"
        }
        ]
    }
};

export default nextConfig;
