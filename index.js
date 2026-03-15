require( 'dotenv' ).config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/db.js');
const articleRoutes = require('./routes/article.route.js');
const authRoutes = require('./routes/user.route.js');
const RequestLogger = require('./middleware/logger.js');
const errorhandler = require('./middleware/errorhandler.js');

const app = express();
const PORT = process.env.PORT || 3007;
connectDB();
app.use(express.json());

app.use(cors('*'));
app.use('/articles', articleRoutes);
app.use('/auth', authRoutes);
app.use(RequestLogger)

app.use(errorhandler)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});