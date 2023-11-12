const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { verifyJWT, JWT } = require('./Middleware/verifyJWT');
const createUser = require('./Routes/users')
const getUserRole = require('./Routes/getUserRole')
const getAllPublisher = require('./Routes/getAllPublisher')
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
        const usersCollection = client.db("BookValley").collection("users");

        app.post("/jwt", async (req, res) => {
            await JWT(req, res)
        });

        app.post("/users", async (req, res) => {
            createUser(req, res, usersCollection)
        });
        app.get("/users/role/:email", verifyJWT, async (req, res) => {
            getUserRole(req, res, usersCollection)
        });

        app.get("/allpublisher", verifyJWT, async (req, res) => {
            getAllPublisher(req, res, usersCollection)
        });





        app.get("/", (req, res) => {
            res.send("hello everybody")
        })


        await client.db("admin").command({ ping: 1 });
    } finally {
    }
}
run().catch(console.dir);

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

