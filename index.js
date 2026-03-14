require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connectDB.js');
const RequestLogger = require('./middleware/logger.js');
const errorhandler = require('./middleware/errorhandler.js');

const ArticleRoutes = require('./routes/article.js');

const app = express();
const PORT = process.env.PORT || 3007;
connectDB();
app.use(express.json());

app.use(cors('*'));
app.use(RequestLogger)

app.use(errorhandler)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});