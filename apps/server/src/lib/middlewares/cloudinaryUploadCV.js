const { CLOUDINARY } = require('../config')

const cloudinaryUploadCV = (req, res, next) => {
  const folder = 'CVs'
  if (req.file && req.file.mimetype === 'application/pdf') {
    CLOUDINARY.uploader
      .upload_stream(
        { resource_type: 'raw', folder: folder },
        (error, result) => {
          if (error) {
            return next(error)
          } else {
            req.cvUrl = result.url
            return next()
          }
        },
      )
      .end(req.file.buffer)
  } else {
    return next()
  }
}

module.exports = cloudinaryUploadCV
