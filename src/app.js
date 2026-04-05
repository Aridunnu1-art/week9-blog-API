const express = require('express');
const cors = require('cors');
const articleRoutes = require('./routes/article.route.js');
const authRoutes = require('./routes/user.route.js');
const RequestLogger = require('./middleware/logger.js');
const errorhandler = require('./middleware/errorhandler.js');

const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });
app.use(express.json());

app.use(cors('*'));
app.use(RequestLogger);
app.post('/upload', upload.single("uploads"), (req, res) => {
    console.log("body", req.body)
console.log("file", req.file)
res.send("Hello, from upload")
});
app.use('/articles', articleRoutes);
app.use('/auth', authRoutes);
app.use(errorhandler)
module.exports = app;
