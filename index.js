const express = require("express");
const cors = require("cors")
const app = (express())
require("dotenv").config();
const Objectid=require('mongodb').ObjectId;
const { MongoClient} = require("mongodb");
const { query } = require("express");



// try port 9000//
const port = process.env.PORT || 9000;

    app.use(cors());

    app.use(express.json());



    app.get('/', async (req, res) => {

        res.send("server Running")
    })

// Connection uri ///
 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0qtlc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//  Connect to database //
async function run() {
    try {
        await client.connect();
        console.log('connected to db');
        const database = client.db('travelGuid');
        const placesCollection = database.collection('places');
        const usersCollection = database.collection('users');

                //    get data from data base to url ///
        app.get('/places',async(req,res)=>{

                 const cursor=placesCollection.find({})
                 const places=await cursor.toArray()


                 res.json(places)

        });

      
        

        app.post('/orders',async(req,res)=>{

               const userData=req.body;
               
               const result= await usersCollection.insertOne(userData)
                 res.json(result)

        });

        app.post("/places",async(req,res)=>{

            const product=req.body;

            const result=await placesCollection.insertOne(product);
            console.log(result);
            res.send(result)
        })

        app.get('/orders',async(req,res)=>{

            const cursor=usersCollection.find({})
            const users=await cursor.toArray()
        
            res.json(users)
        })

        app.put("/order/:id",async(req,res)=>{
            const id=req.params.id;
            console.log('id ',id);
          
          const updateUser=req.body;
        console.log(updateUser);
           const filter={_id: Objectid(id)}
           const options = { upsert: true };
           const updateDoc = {
            $set: {
              status: `active`
            },
          };

          const result= await usersCollection.updateMany(filter,updateDoc,options)
         


           res.json(result)
        })
                       
        app.delete("/order/:id",async(req,res)=>{

            const id=req.params.id;

            const query={_id: Objectid(id)}
            const result=await usersCollection.deleteOne(query);

            res.send(result)
        })
       

        app.get("/orders/:email",async (req,res)=>{

            const email=req.params;
         
          const query={Email:email.email}

           const result= await usersCollection.find(query).toArray()
           console.log(result);
            res.send(result)
        });
        
        app.get("/order/:id", async (req,res)=>{

            const id=req.params.id;

            const query={_id:Objectid(id)}


            const result= await usersCollection.find(query).toArray();
            res.json(result)

 
        })
       


        


    } finally {
        // Ensures that the client will close when you finish/error
        //   await client.close();
    }
}

run().catch(console.dir);

//    Root path ///



// listening to port ///
app.listen(port, () => {
    console.log("Running on port", port);

})

