const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const {verifyJWT,JWT} = require('./Middleware/verifyJWT'); 
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PATCH,PUT,DELETE",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
    })
);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxayaa3.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
});



async function run() {
    try {
        const Collection = client.db("BookValley").collection("users");
        const usersCollection = client.db("BookValley").collection("users");

        app.post("/jwt", async(req, res) => {
           await JWT(req,res)
        });

        app.post("/users", async (req, res) => {
            const user = req.body;
            const query = { email: user.email };
            const existingUser = await usersCollection.findOne(query);
      
            if (existingUser) {
              return res.send({ message: "user already exists" });
            }
      
            const result = await usersCollection.insertOne(user);
            res.send(result);
          });

        // const verifyAdmin = async (req, res, next) => {
        //   const email = req.decoded.email;
        //   const query = { email: email };
        //   const user = await usersCollection.findOne(query);
        //   if (user?.role !== "admin") {
        //     return res
        //       .status(403)
        //       .send({ error: true, message: "forbidden message" });
        //   }
        //   next();
        // };

        app.get("/",(req,res)=>{
            res.send("hello ewverybody")
        })


        await client.db("admin").command({ ping: 1 });
    } finally {
    }
}
run().catch(console.dir);

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});