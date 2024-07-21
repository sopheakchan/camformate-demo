require('dotenv').config()
const cloudinary = require('cloudinary').v2

// Configure Cloudinary with your account details
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

module.exports = cloudinary

// Upload image using a buffer
// const imageBuffer = // your image buffer;
// cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(result);
//   }
// }).end(imageBuffer);
