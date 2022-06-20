// const AWS = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// require("dotenv").config();

// const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_REGION, S3_BUCKET_NAME } = process.env;

// const s3 = new AWS.S3({
//     accessKeyId: S3_ACCESS_KEY_ID,
//     secretAccessKey: S3_SECRET_ACCESS_KEY,
//     region: S3_BUCKET_REGION,
// });

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: S3_BUCKET_NAME,
//         acl: 'public-read',
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         metadata: function(req, file, cb) {
//             cb(null, {fieldName: file.fieldname});
//         },
//         key: function(req, file, cb) {
//             console.log(file);
//             cb(null, `${Date.now().toString()}-${file.originalname}`);
//         },
//     }),
//     limits: {
//         fileSize: 1000 * 1000 * 10
//     },
// });

// exports.upload = multer(upload);