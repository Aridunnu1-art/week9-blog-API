const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const validateArticle = require("../validators/articleValidator");


// CREATE ARTICLE
router.post("/", async (req, res) => {

  const { error } = validateArticle(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const article = new Article(req.body);

  await article.save();

  res.send(article);
});


// GET ALL ARTICLES
router.get("/", async (req, res) => {

  const articles = await Article.find();

  res.send(articles);
});


// GET ONE ARTICLE
router.get("/:id", async (req, res) => {

  const article = await Article.findById(req.params.id);

  if (!article) return res.status(404).send("Article not found");

  res.send(article);
});


// UPDATE ARTICLE
router.put("/:id", async (req, res) => {

  const { error } = validateArticle(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const article = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.send(article);
});


// DELETE ARTICLE
router.delete("/:id", async (req, res) => {

  await Article.findByIdAndDelete(req.params.id);

  res.send({ message: "Article deleted successfully" });
});

module.exports = router;