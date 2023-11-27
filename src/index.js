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
const postBookRequest = require('./Routes/postBookRequest')
const getWriterRequest = require('./Routes/getWriterRequest')
const getOffertoPublisher = require('./Routes/getOffertoPublisher')
const postChat = require('./Routes/postChat')
const getChat = require('./Routes/getChat')
const postAgreement = require('./Routes/postAgreement')
const postWriterApproval = require('./Routes/postWriterApproval')
const postUploadBook = require('./Routes/postUploadBook')
const getAllusers = require('./Routes/getAllusers')
const getAllBook = require('./Routes/getAllBook')
const PostAdminApproval = require('./Routes/PostAdminApproval')
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
        const requestCollection = client.db("BookValley").collection("bookRequests");
        const verifyWriter = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);

            if (user?.role !== "writer") {
                return res
                    .status(403)
                    .send({ error: true, message: "forbidden access" });
            }

            next();
        };
        const verifyPublisher = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);

            if (user?.role !== "publisher") {
                return res
                    .status(403)
                    .send({ error: true, message: "forbidden access" });
            }
            next();
        };
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);

            if (user?.role !== "admin") {
                return res
                    .status(403)
                    .send({ error: true, message: "forbidden access" });
            }
            next();
        };


        app.post("/jwt", async (req, res) => {
            await JWT(req, res)
        });

        app.post("/users", async (req, res) => {
            createUser(req, res, usersCollection)
        });
        
        app.get("/allusers", async (req, res) => {
            getAllusers(req, res, usersCollection)
        });

        app.get("/users/role/:email", verifyJWT, async (req, res) => {
            getUserRole(req, res, usersCollection)
        });

        app.get("/allpublisher", verifyJWT, async (req, res) => {
            getAllPublisher(req, res, usersCollection)
        });

        app.post("/requesttopublisher", verifyJWT, verifyWriter, async (req, res) => {
            postBookRequest(req, res, requestCollection)
        })

        app.get("/writerrequest/:email", verifyJWT,verifyWriter, async (req, res) => {
            getWriterRequest(req, res, requestCollection)
        });
        app.get("/offertopublisher/:email", verifyJWT,verifyPublisher, async (req, res) => {
            getOffertoPublisher(req, res, requestCollection)
        });
        app.patch("/chat", verifyJWT, async (req, res) => {
            postChat(req, res, requestCollection)
        })
        app.get("/getchat/:id", verifyJWT, async (req, res) => {
            getChat(req, res, requestCollection)
        });

        app.patch("/postagreement", verifyJWT,verifyPublisher, async (req, res) => {
            postAgreement(req, res, requestCollection)
        })
        
        app.patch("/writerapproval", verifyJWT,verifyWriter, async (req, res) => {
            postWriterApproval(req, res, requestCollection)
        })

        app.patch("/postuploadbook", verifyJWT,verifyPublisher, async (req, res) => {
            postUploadBook(req, res, requestCollection)
        })
        

        app.get("/allbooks", verifyJWT, async (req, res) => {
            getAllBook(req, res, requestCollection)
        });
        app.patch("/PostAdminApproval", verifyJWT,verifyAdmin, async (req, res) => {
            PostAdminApproval(req, res, requestCollection)
        })
        
        app.get("/", (req, res) => {
            res.send("server is running")
        })

        await client.db("admin").command({ ping: 1 });
    } finally {
    }
}
run().catch(console.dir);

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

