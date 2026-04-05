const express = require("express");
const { createPost, getAllPosts, getPost, deletePost } = require("../controllers/post.controller");
const { authenticateReq } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticateReq);

router.post("/create-post", createPost);
router.post("/posts", getAllPosts);
router.post("/:id", getPost);
router.delete("/:id", deletePost);

module.exports = router