/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental :{
        serverActions : {
            bodySizeLimit : '10mb'
        }
    },
    images :{
        remotePatterns :[{
            protocol : 'https',
            hostname : 'czzzhhqimbewchmpyhpi.supabase.co',
            pathname : "/**",
            port : "",
            search : ""
        }]
    },
    devIndicators:false
};

export default nextConfig;
