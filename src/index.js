require('dotenv/config')
const express = require('express')
const AWS =  require('aws-sdk')
const app = express()
const port = 3000

const accessKeyId = process.env.ACCESSKEYID
const secretAccessKey = process.env.SECRETACCESSKEY
const bucket = process.env.BUCKET_NAME

AWS.config.update({
    region: 'sa-east-1',
    accessKeyId,
    secretAccessKey
});


const s3 = new AWS.S3();

const getDoc = async (name, type) => {
    try {
        const url = await s3.getSignedUrlPromise('getObject',{
            Bucket: bucket,
            Key: `${name}.${type}`,
            Expires: 60
        })
        
        const response = {
            url: url
        }
        
    } catch (err) {
        console.log(err);
    }
};

app.get('/download', (req, res) => {
    
    console.log(getDoc('EU','jpg'))
    res.status('200')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
