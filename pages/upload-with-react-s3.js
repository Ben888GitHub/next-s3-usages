import { useState } from 'react';
import S3 from 'aws-s3';

const config = {
	bucketName: 'products-mighty-images',
	region: 'ap-southeast-1',
	accessKeyId: 'AKIARLIPX47FKR7UPX4T',
	secretAccessKey: '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'
};

const S3Client = new S3(config);

function Uwrt() {
	const [selectedFile, setSelectedFile] = useState(null);

	console.log(config);

	const handleFileInput = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleUpload = async (file) => {
		await S3Client.uploadFile(file)
			.then((data) => console.log(data))
			.catch((err) => console.error(err));
	};

	return (
		<div>
			<h1>React S3 File Upload</h1>
			<input type="file" onChange={handleFileInput} />
			<button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
		</div>
	);
}

export default Uwrt;
