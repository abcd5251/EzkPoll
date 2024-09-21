/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "firebasestorage.googleapis.com",
            "firebasestorage.googleapis.com",
            "picsum.photos",
            "i.seadn.io",
            "upload.wikimedia.org",
        ],
    },
    allowedHosts: ["https://ezkpoll-backend.onrender.com/", "*"],
    allowedOrigin: ["https://ezkpoll-backend.onrender.com/", "*"],
};

export default nextConfig;
