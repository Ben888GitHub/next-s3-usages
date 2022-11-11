import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import axios from 'axios';

const BUCKET_URL =
	'https://products-mighty-images.s3.ap-southeast-1.amazonaws.com';

export default function Home() {
	const [file, setFile] = useState();
	const [uploadingStatus, setUploadingStatus] = useState();
	const [uploadedFile, setUploadedFile] = useState(``);

	const selectFile = (e) => {
		console.log(e.target.files);
		setFile(e.target.files[0]);
	};

	function hasWhiteSpace(s) {
		return /\s/g.test(s);
	}

	const uploadFile = async () => {
		setUploadingStatus('Uploading the file to AWS S3');

		// make a POST request to created earlier API route
		//todo uncomment this
		let { data } = await axios.post(
			'/api/upload-file-s3',
			{
				name: file.name,
				type: file.type
			},
			{
				headers: {
					'Access-Control-Allow-Origin': '*'
				}
			}
		);

		// Fetching out an image URL
		//todo uncomment this
		const url = data.url;

		console.log(url);
		const stringifyName = String(file.name);
		console.log(stringifyName);
		const fileName = hasWhiteSpace(stringifyName)
			? stringifyName.replace(/ /g, '%20')
			: stringifyName;

		// todo, update this in your project-admin-dashboard
		// console.log(`${BUCKET_URL}/${fileName}`);
		// setUploadedFile(`${BUCKET_URL}/${fileName}`);
		// Uploading a file
		await axios.put(url, file, {
			headers: {
				'Content-type': String(file.type),
				'Access-Control-Allow-Origin': '*'
				// 'Access-Control-Allow-Headers': 'Content-Type,API-Key'
			}
		});
		setUploadedFile(`${BUCKET_URL}/${fileName}`);
		console.log(`${BUCKET_URL}/${fileName}`);

		// console.log(newData);
		// console.log(BUCKET_URL);
		// console.log(file.name);

		// setUploadedFile(BUCKET_URL + file.name);

		// setUploadedFile(BUCKET_URL + file.name);
		// setFile(null);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1>NextJs S3 tips and tricks</h1>
				<br />
				<input type="file" onChange={selectFile} />
				<br />
				<button onClick={uploadFile}>Upload a file</button>
				{/* {uploadingStatus && <p>{uploadingStatus}</p>}
				{uploadedFile && <img src={uploadedFile} />} */}
				{uploadedFile && (
					<Image src={uploadedFile} alt="photo" height={500} width={500} />
				)}
			</main>
		</div>
	);
}
