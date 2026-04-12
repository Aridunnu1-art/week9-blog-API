require( 'dotenv' ).config();
const connectDB = require('./src/config/db.js');
const app = require('./src/app');
const PORT = process.env.PORT;
connectDB();
app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
});