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

// create article
router.post("/articles", requireAuth, createArticle);

// get all articles
router.get("/articles", requireAuth, getArticles);

// get single article
router.get("/articles/:id", requireAuth, getSingleArticle);

// update article
router.put("/articles/:id", requireAuth, updateArticle);

// delete article
router.delete("/articles/:id", requireAuth, deleteArticle);

module.exports = router;