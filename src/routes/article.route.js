const express = require("express");
const router = express.Router();

const {
  createArticle,
  getArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle
} = require("../controllers/article.controller");

const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);
// create article
router.post("/articles", createArticle);

// get all articles
router.get("/articles", getArticles);

// get single article
router.get("/articles/:id", getSingleArticle);

// update article
router.put("/articles/:id", updateArticle);

// delete article
router.delete("/articles/:id",  deleteArticle);

module.exports = router;