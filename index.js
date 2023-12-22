const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PSS}@cluster0.4kfubsh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
// your project work will be here

const taskCollection = client.db('TreeHouse').collection('tasklist');

// get the list
app.get('/tasklist/:email', async(req, res) => {
    const email = req.params.email;
    const products = await taskCollection.find({email:email}).toArray();
    res.send(products);
  });

//  post task
 app.post('/tasklist', async (req, res) => {
      const item = req.body;
      const result = await taskCollection.insertOne(item)
      res.send(result);
    })



    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('make your house by tree')
})

app.listen(port, () =>{
    console.log(`Treehouse server is running on port: ${port}`);
})
