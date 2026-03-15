const Article = require("../models/article.model");

// CREATE ARTICLE
const createArticle = async (req, res) => {
  try {

    const { title, content } = req.body;

    const article = await Article.create({
      title,
      content,
      userId: req.user.id
    });

    res.status(201).json(article);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL ARTICLES
const getArticles = async (req, res) => {
  try {

    const articles = await Article.find();

    res.status(200).json(articles);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SINGLE ARTICLE
const getSingleArticle = async (req, res) => {
  try {

    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE ARTICLE (ONLY OWNER)
const updateArticle = async (req, res) => {
  try {

    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedArticle);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE ARTICLE (ONLY OWNER)
const deleteArticle = async (req, res) => {
  try {

    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Article.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Article deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createArticle,
  getArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle
};