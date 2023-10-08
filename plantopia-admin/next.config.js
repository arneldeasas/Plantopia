/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, 
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,OPTIONS,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token,Access-Control-Allow-Headers, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Credentials" },
                    { key:"Vary",value:"RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url"}
                ]
            }
        ]
    }
};

module.exports = nextConfig;
