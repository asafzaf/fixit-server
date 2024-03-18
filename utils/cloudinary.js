const {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require("../constants");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

exports.uploadCloud = async (imageName) => {
  const path = `public/img/faults/${imageName}`;
  const result = await cloudinary.uploader.upload(
    path,
    { public_id: imageName },
    function (error, result) {
      console.log(result);
    }
  );
  return result.secure_url;
};
