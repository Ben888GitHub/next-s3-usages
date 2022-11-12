import S3 from 'aws-sdk/clients/s3';

// Create S3 instance
const s3 = new S3({
	region: 'ap-southeast-1',
	accessKeyId: process.env.ACCESS_KEY,
	secretAccessKey: process.env.SECRET_KEY,
	signatureVersion: 'v4',
	useAccelerateEndpoint: true
});

export default async function handler(req, res) {
	const { method, body } = req;

	if (method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		console.log(s3);
		// retrieve name and type from the body request
		let { name, type } = body;

		// setting params - ACL let us see the file
		const fileParams = {
			Bucket: process.env.BUCKET_NAME,
			Key: name,
			Expires: 600,
			ContentType: type
		};

		console.log(fileParams);

		// Generating a signed URL which we'll use to upload a file
		const url = await s3.getSignedUrlPromise('putObject', fileParams);
		// const url = await s3.createPresignedPost('putObject', fileParams);

		console.log(url);

		res.status(200).json({ url });
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err });
	}
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '8mb'
		}
	}
};
