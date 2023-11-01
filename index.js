const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
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

// const verifyJWT = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (!authorization) {
//     return res
//       .status(401)
//       .send({ error: true, message: "unauthorized access" });
//   }
//   const token = authorization.split(" ")[1];
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
//     if (error) {
//       return res
//         .status(401)
//         .send({ error: true, message: "unauthorized access" });
//     }
//     req.decoded = decoded;
//     next();
//   });
// };

async function run() {
    try {
        const Collection = client.db("BookValley").collection("users");


        // app.post("/jwt", (req, res) => {
        //   const user = req.body;

        //   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        //     expiresIn: "7d",
        //   });
        //   res.send({ token });
        // });

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


        await client.db("admin").command({ ping: 1 });
    } finally {
    }
}
run().catch(console.dir);

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});