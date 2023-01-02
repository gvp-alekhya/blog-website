import { S3Client, GetObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { DynamoDB } from "@aws-sdk/client-dynamodb"
import AWS from 'aws-sdk';

const dynamoDB = new DynamoDB({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const s3 = new AWS.S3();

export const getSortedPostsData = async () => {

  var params = {
    Select: "ALL_ATTRIBUTES",
    TableName: process.env.AWS_TABLE_NAME
  };
  return await dynamoDB.scan(params);
};

export const getDataFromS3 = async () => {


  const command = new ListObjectsCommand({ Bucket: process.env.AWS_BUCKET });
  let posts = { Key: "No data" };
  let response = await s3Client.send(command);
  if (response) {
    posts = response.Contents.map(item => item.Key);
  }
  else {
    posts = { Key: "No res" };
  }
  return posts;
}

export async function getPostData(id) {
  const dynamoDbParams = {
    TableName: process.env.AWS_TABLE_NAME,
    Key: {
      name: { S: id },
    },
  };
  const dynamoDbResult = await dynamoDB.getItem(dynamoDbParams);

  const imageKey = dynamoDbResult.Item.image.S;

  // // Retrieve the S3 object.
  let s3Params = {
    Bucket: process.env.AWS_BUCKET,
    Key: imageKey,
  };
  let data = await s3.getObject(s3Params).promise();
  const imageUrl = `data:${data.ContentType};base64,${data.Body.toString('base64')}`;

  const videoKey = dynamoDbResult.Item.audio.S;
  s3Params = {
    Bucket: process.env.AWS_BUCKET,
    Key: videoKey,
  };
  data = await s3.getObject(s3Params).promise();
  const videoUrl = `data:${data.ContentType};base64,${data.Body.toString('base64')}`;

  return {
    imageUrl: imageUrl,
    videoUrl: videoUrl,
    description: dynamoDbResult.Item.description.S
  };

  // const command = new GetObjectCommand(s3Params);
  // return await s3Client.send(command) ;

}
