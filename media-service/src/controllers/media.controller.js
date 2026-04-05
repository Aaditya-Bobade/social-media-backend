const { Media } = require("../models/Media");
const { uploadMediaToCloudinary } = require("../utils/cloudinar");
const logger = require("../utils/logger");

const uploadMedia = async (req, res) => {
  logger.info("Uploading media...");
  try {
    console.log(req.file);
    if (!req.file) {
      logger.error("No file found. Please add a file and try again!");
      return res.status(400).json({
        success: true,
        message: "No file found. Please add a file and try again!",
      });
    }

    const { originalname, mimetype, buffer } = req.file;
    const userId = req.user.userId;

    logger.info(`File details: Name:${originalname}, Type:${mimetype}`);
    logger.info("Uploading to cloudinary starting... ");

    const cloudinaryUploadResult = await uploadMediaToCloudinary(req.file);
    logger.info(
      `Cloudinary upload successfull, Pubilc id:${cloudinaryUploadResult.public_id}`,
    );

    const newlyCreatedMedia = new Media({
      publicId: cloudinaryUploadResult.public_id,
      originalName: originalname,
      mimeType: mimetype,
      url: cloudinaryUploadResult.secure_url,
      userId,
    });

    await newlyCreatedMedia.save();

    res.status(201).json({
      success: true,
      mediaId: newlyCreatedMedia._id,
      url: newlyCreatedMedia.url,
      message: "Media upload is successfull",
    });
  } catch (error) {
    logger.error("Error while uploading media", error);
    res.status(500).json({
      success: false,
      message: "Error while uploading media",
    });
  }
};

const getAllMedias = async (req, res) => {
  try {
    const medias = await Media.find({});
    res.json({ medias });
  } catch (error) {
    logger.error("Error while fetching media", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching media",
    });
  }
};

module.exports = { uploadMedia, getAllMedias };
