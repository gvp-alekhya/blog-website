const AWS = require('aws-sdk')


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const dynamoDb = new AWS.DynamoDB.DocumentClient({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

export default async function createContent(req, res) {
    console.log('Request :: ', JSON.stringify(req.body));

    let formData = req.body, item = {
        name: formData.title,
        image: "Post/" + formData.image.name,
        video: "Audio/" + formData.video.name,
        description: formData.description
    }
    let title, image, descritpion, video;
    if (req.body.image) {
        var buf = Buffer.from(req.body.image.base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
        var data = {
            Key: "Post/" + formData.image.name,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: formData.image.type,
            Bucket: process.env.AWS_BUCKET
        };
        s3.putObject(data, function (err, data) {
            if (err) {
                console.log('Err :: ', JSON.stringify(err));
                console.log('Error uploading data: ', data);
            } else {
                console.log('successfully uploaded the image!' + JSON.stringify(data));
            }
        });
        item.image =  "Post/" + formData.image.name;
    }
    if (req.body.video) {
        var buf = Buffer.from(req.body.video.base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
        var data = {
            Key: "Video/" + formData.video.name,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: formData.video.type,
            Bucket: process.env.AWS_BUCKET
        };
        s3.putObject(data, function (err, data) {
            if (err) {
                console.log('Err :: ', JSON.stringify(err));
                console.log('Error uploading data: ', data);
            } else {
                console.log('successfully uploaded the video!' + JSON.stringify(data));
            }
        });
        item.video =  "Audio/" + formData.video.name;
    }

    let params = {
        TableName: process.env.AWS_TABLE_NAME,
        Item: item
      };

      dynamoDb.put(params, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Record added successfully');
        }
      });

    res.send("Success");
};



