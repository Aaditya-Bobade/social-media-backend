const Search = require("../models/Search");
const logger = require("../utils/logger");

const searchController = async (req, res) => {
  logger.info("Search endpoint hitted...");
  try {
    const query = req.query.query;
    console.log(query);
    
    const results = await Search.find(
      {
        $text: { $search: query },
      },
      { score: { $meta: "textScore" } },
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(10);

    res.json({ results });
  } catch (error) {
    logger.error("Error while searching", error);
    res.status(500).json({
      success: false,
      message: "Error while searching",
    });
  }
};

module.exports = { searchController };
