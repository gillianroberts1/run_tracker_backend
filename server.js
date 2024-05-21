

const express = require('express');
const app = express();
const createRouter = require('./helpers/create_router.jsx')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient

app.use(express.json());
app.use(cors())
const port = 9000;

const uri = 'mongodb://localhost:27017'; // Your MongoDB connection string
const dbName = 'run_tracker'; // Replace with your database name


MongoClient.connect('mongodb://127.0.0.1:27017', {useUnifiedTopology: true})
.then((client) => {
const db = client.db('run_tracker');
const runCollection = db.collection('runs')
const runsRouter = createRouter(runCollection);
app.use('/api/runs', runsRouter);

})
.catch(console.error)

app.listen(9000, function (){
    console.log("Listening on port 9000");
})