const logger = require("../utils/logger");
const { Media } = require("../models/Media");
const { deleteMediaFromCloudinary } = require("../utils/cloudinar");

const handlePostDelete = async (event) => {
  console.log("Event occured:", event);
  const { postId, mediaIds } = event;
  try {
    const mediasToDelete = await Media.find({ _id: { $in: mediaIds } });

    for (const media of mediasToDelete) {
      await deleteMediaFromCloudinary(media.publicId);
      await Media.findByIdAndDelete(media._id);
      logger.info(
        `Deleted media ${media._id} associated with this deleted post ${postId}`,
      );
    }

    logger.info(`Processed deletion of media for post id ${postId}`);
  } catch (error) {
    logger.error("Error while deleting post", error);
  }
};

module.exports = { handlePostDelete };
