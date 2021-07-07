require('dotenv/config')
const express = require('express')
const AWS = require('aws-sdk')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser)

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
        const url = await s3.getSignedUrlPromise('getObject', {
            Bucket: bucket,
            Key: `${name}.${type}`,
            Expires: 60
        })

        const response = {
            url: url
        }
        console.log(response)
    } catch (err) {
        console.log(err);
    }
};

const putDoc = async (name, type) => {
    try {
        const url = await s3.getSignedUrlPromise('putObject', {
            Bucket: bucket,
            Key: `${name}.${type}`,
            Expires: 60
        })

        const response = {
            url: url
        }

        console.log(response)
    } catch (err) {
        console.log(err);
    }
};

app.get('/download', (req, res) => {
    //let name = req.body.name
    //let type = req.body.type

    getDoc('teste', 'png')
    //console.log(getDoc(name,type))
    res.status('200').send('ok').end()
})

app.get('/upload', (req, res) => {
    //let name = req.body.name
    //let type = req.body.type
    putDoc('teste', 'png')
    res.status('200').send('ok').end()
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
