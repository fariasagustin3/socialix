const cloudinary = require("../../cloudinary/cloudinary")

const uploadImage = (req, res) => {
  console.log(cloudinary)
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).json({ error: err });
    } else {
      return res.status(200).json({
        status: "OK",
        message: "Uploaded",
        data: result.url
      })
    }
  })
}

module.exports = uploadImage;
