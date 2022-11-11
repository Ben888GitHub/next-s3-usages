/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['products-mighty-images.s3.ap-southeast-1.amazonaws.com']
	}
};

module.exports = nextConfig;
