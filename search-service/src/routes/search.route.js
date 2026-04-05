const express = require("express");
const { searchController } = require("../controllers/search.controller");
const { authenticateReq } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticateReq);

router.get("/posts", searchController);

module.exports = router;
