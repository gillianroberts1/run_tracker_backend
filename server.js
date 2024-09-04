require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const createRouter = require('./helpers/create_router');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 9000;

// Access the MongoDB connection string from environment variables
const uri = process.env.MONGODB_URL;
const dbName = 'Track_my_run';

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// Connect to MongoDB using the connection string from environment variables
MongoClient.connect(uri, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db(dbName);
    const runCollection = db.collection('Runs');
    const runsRouter = createRouter(runCollection);
    app.use('/api/runs', runsRouter);

    // Catch-all handler for any request that doesn't match the API
    // This serves the React app's index.html file
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    // Start the server after successful database connection
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch(console.error);
