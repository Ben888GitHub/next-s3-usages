/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['products-mighty-images.s3-accelerate.amazonaws.com']
	}
};

module.exports = nextConfig;
