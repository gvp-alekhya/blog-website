import { S3Client, GetObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { DynamoDB } from "@aws-sdk/client-dynamodb"
import AWS from 'aws-sdk';
export const config = {
  api: {
      bodyParser: {
          sizeLimit: '10mb' // Set desired value here
      }
  }
}
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
  let postData = {title: id};
  const dynamoDbParams = {
    TableName: process.env.AWS_TABLE_NAME,
    Key: {
      name: { S: id },
    },
  };
  const dynamoDbResult = await dynamoDB.getItem(dynamoDbParams);

  let s3Params = {
    Bucket: process.env.AWS_BUCKET,
  };
  let data;
  if (dynamoDbResult.Item.image) {
    const imageKey = dynamoDbResult.Item.image.S;

    // // Retrieve the S3 object.
    s3Params.Key = imageKey;
    data = await s3.getObject(s3Params).promise();
    const imageUrl = `data:${data.ContentType};base64,${data.Body.toString('base64')}`;
    postData.imageUrl = imageUrl;

  }
  if (dynamoDbResult.Item.audio) {
    const videoKey = dynamoDbResult.Item.audio.S;
    s3Params.Key = videoKey;
    data = await s3.getObject(s3Params).promise();
    const videoUrl = `data:${data.ContentType};base64,${data.Body.toString('base64')}`;
    postData.videoUrl = videoUrl;
  }
  if (dynamoDbResult.Item.description)
    postData.description = dynamoDbResult.Item.description.S
  return postData;
  // const command = new GetObjectCommand(s3Params);
  // return await s3Client.send(command) ;

}
