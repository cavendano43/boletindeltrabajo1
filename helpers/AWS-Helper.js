const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const s3= new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
})

exports.FileUploadS3 = async (buffer,name) =>{
    const fileType=name;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key:`assets/${name}`,
        Body:buffer,
        ACL: 'public-read'
    }
    await s3.upload(params, (error, data) => {
        if(error){
            console.log(error);
            return error;
        }
        console.log(data);
        return data;
    })
}