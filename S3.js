//This file takes the image that we are uploading and puts it in Amazon//

const knox = require('knox');
const fs = require('fs');

let secrets;

if (process.env.NODE_ENV == 'production') {
    secrets = process.env; //Secrets in production are environment variables (E.g. to use in Heroku)
} else {
    secrets = require('./secrets');
}

const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: 'my-imageboard' //'thenameofmybucket'
});

exports.upload = function(req, res, next) {
    if (!req.file) {
        res.sendStatus(500); //We don't talk to Amazon unless we have a file
    }

    //Configure the request we're gonna make to Amazon
    const s3Request = client.put(req.file.filename, { //Put request (similar to post)
        'Content-Type': req.file.mimetype,
        'Content-Length': req.file.size,
        'x-amz-acl': 'public-read'
    });

    //Make the request
    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(s3Request);

    //Wait for a response
    s3Request.on('response', s3Response => {
        //If the status code is anything but 200, wasSuccessful would be false
        const wasSuccessful = s3Response.statusCode == 200;
        /*
        AKA
        if (s3Response.statusCode == 200) {
            const wasSuccessful = true;
        } else {
            const wasSuccessful = false;
        }
        */
        // console.log('s3Response.statusCode:', s3Response.statusCode);
        if (wasSuccessful) {
            next();
        } else {
            res.statusCode(500);
        }
        // res.json({ //This is called in index.js, in the app.post('/upload')
        //     success: wasSuccessful
        // });
    });
};
