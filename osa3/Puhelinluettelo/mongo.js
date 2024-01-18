const mongoose = require('mongoose');

// MongoDB connection URL and options
const url = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  poolSize: 10 // Increase pool size for better performance under load
};

// Connect to MongoDB
mongoose.connect(url, options)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

// Advanced Query Example (can be replaced with an actual query relevant to the app)
const advancedQuery = async () => {
  try {
    const result = await mongoose.connection.db.collection('contacts').aggregate([
      // Aggregation pipeline stages
    ]).toArray();
    return result;
  } catch (err) {
    console.error('Error performing advanced query:', err.message);
  }
};

module.exports = { mongoose, advancedQuery };