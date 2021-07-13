require('dotenv/config')
const express = require('express')
const AWS = require('aws-sdk')
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
        let url = await s3.getSignedUrlPromise('getObject', {
            Bucket: bucket,
            Key: `${name}.${type}`,
            Expires: 60
        })

        const data = await url
    
        return data
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
    
            const data = await url
    
            return data
    
        } catch (err) {
            console.log(err);
        }
    };


app.get('/download/:name/:type', (req, res) => {

    let name = req.params.type;
    let type = req.params.type;

    getDoc(name,type).then(value => {
        let data = {
            url: value
        }
        res.json(data).end()
    })
    
})

app.get('/upload/:name/:type', (req, res) => {

    let name = req.params.type;
    let type = req.params.type;

    putDoc(name,type).then(value => {
        let data = {
            url: value
        }
        res.json(data).end()
    })
    
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

