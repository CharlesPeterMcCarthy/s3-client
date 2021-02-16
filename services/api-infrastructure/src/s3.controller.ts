import {
	ApiResponse,
	ApiHandler,
	ApiEvent,
	ApiContext,
} from '../api.types';

import {
	S3Client,
	PutObjectCommand,
	CreateBucketCommand
} from '@aws-sdk/client-s3';

// Set the AWS region
const REGION: string = 'eu-west-1';

// Set the bucket parameters
const bucketName: string = 's00182072';
const bucketParams: any = { Bucket: bucketName };

// Create name for uploaded object key
const keyName: string = 'hello_world.txt';
const objectParams: any = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' };

// Create an S3 client service object
const s3: S3Client = new S3Client({ region: REGION });

export class S3Controller {

	public s3Put: ApiHandler = async (event: ApiEvent, context: ApiContext): Promise<ApiResponse> => {
		try {
			const data: any = await s3.send(new CreateBucketCommand(bucketParams));
			console.log('Success. Bucket created.');
			console.log(data);
		} catch (err) {
			console.log('Error', err);
		}
		try {
			const results: any = await s3.send(new PutObjectCommand(objectParams));
			console.log(`Successfully uploaded data to ${bucketName}/${keyName}`);
			console.log(results);
		} catch (err) {
			console.log('Error', err);
		}

		return {
			statusCode: 200,
			body: JSON.stringify({ success: true }),
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		};
	}

}
