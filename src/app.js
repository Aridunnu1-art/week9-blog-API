const express = require('express');
const cors = require('cors');
const articleRoutes = require('./routes/article.route.js');
const authRoutes = require('./routes/user.route.js');
const RequestLogger = require('./middleware/logger.js');
const errorhandler = require('./middleware/errorhandler.js');

const app = express();
app.use(express.json());

app.use(cors('*'));
app.use(RequestLogger);
app.use('/articles', articleRoutes);
app.use('/auth', authRoutes);

app.use(errorhandler)
module.exports = app;
