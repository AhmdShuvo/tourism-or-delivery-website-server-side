const express = require("express");
const cors = require("cors")
const app = (express())
require("dotenv").config();
const { MongoClient } = require("mongodb");



// try port 9000//
const port = process.env.PORT || 9000;

    app.use(cors());

    app.use(express.json());

// Connection uri ///
 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0qtlc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//  Connect to database //
async function run() {
    try {
        await client.connect();
        const database = client.db('travelGuid');
        const movies = database.collection('places');



    } finally {
        // Ensures that the client will close when you finish/error
        //   await client.close();
    }
}
run().catch(console.dir);


//    Root path ///
app.get('/', async (req, res) => {

    res.send("server Running")
})


// listening to port ///
app.listen(port, () => {
    console.log("Running on port", port);

})