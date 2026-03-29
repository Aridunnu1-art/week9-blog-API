require( 'dotenv' ).config();
const connectDB = require('./src/config/db.js');
const app = require('./src/app');
const PORT = process.env.PORT;

app.listen(PORT, async () => {
 await connectDB();
  console.log(`Server is listening on port ${PORT}`);
});