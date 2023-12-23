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
const getSingleBookdetails = require('./Routes/getSingleBookdetails')
const getCheckDuplicateReview = require('./Routes/getCheckDuplicateReview')
const postreview = require('./Routes/postreview')
const getExistsIncart = require('./Routes/getExistsIncart')
const postAddTocart = require('./Routes/postAddTocart')
const getCartItem = require('./Routes/getCartItem')
const deleteFromCart = require('./Routes/deleteFromCart')
const postPaidBook = require('./Routes/postPaidBook')
const UpdateSoldUnit = require('./Routes/UpdateSoldUnit')
const UpdateCartToEmpty = require('./Routes/UpdateCartToEmpty')
const getPaidBook = require('./Routes/getPaidBook')
const postFreeBook = require('./Routes/postFreeBook')
const getExistInPaidbook = require('./Routes/getExistInPaidbook')
const getFreeBook = require('./Routes/getFreeBook')
const getExistsInFreeBook = require('./Routes/getExistsInFreeBook')
const postAddToFreeBook = require('./Routes/postAddToFreeBook')
const deleteFromFreeBook = require('./Routes/deleteFromFreeBook')
const getReaderFreeBookItem = require('./Routes/getReaderFreeBookItem')
const getPaymentDetails = require('./Routes/getPaymentDetails')
const postReaderProfileUpdate = require('./Routes/postReaderProfileUpdate')
const postWriterProfileUpdate = require('./Routes/postWriterProfileUpdate')
const postWriterBlog = require('./Routes/postWriterBlog')
const getAllBlog = require('./Routes/getAllBlog')
const PostBlogApproval = require('./Routes/postBlogApproval')
const getSingleBlogDetails = require('./Routes/getSingleBlogDetails')
const getWithdrawAmount = require('./Routes/getWithdrawAmount')
const updateWithdrawAmount = require('./Routes/updateWithdrawAmount')
const updateWithdrawHistory = require('./Routes/updateWithdrawHistory')
const postpublisherProfileUpdate = require('./Routes/postpublisherProfileUpdate')
const postBlockUser = require('./Routes/postBlockUser')
const getSingleUser = require('./Routes/getSingleUser')
const getAllStatistic = require('./Routes/getAllStatistic')
const updateDeclineRequestbyPubliher = require('./Routes/updateDeclineRequestbyPubliher')
const getApprovedBooks = require('./Routes/getApprovedBooks')
const getBookByCategories = require('./Routes/getBookByCategories')
const getRecommededBook = require('./Routes/getRecommededBook')

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
        const readerWriterCollection = client.db("BookValley").collection("reader-writer");
        const freebookCollection = client.db("BookValley").collection("freebook");
        const blogCollection = client.db("BookValley").collection("blog");
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
            createUser(req, res, usersCollection, readerWriterCollection)
        });


        app.get("/allusers", async (req, res) => {
            getAllusers(req, res, usersCollection)
        });
        
        app.get("/getApprovedBooks", async (req, res) => {
            getApprovedBooks(req, res, requestCollection)
        });
        app.get("/getAllStatistic",verifyJWT,verifyAdmin, async (req, res) => {
            getAllStatistic(req, res, usersCollection,requestCollection,readerWriterCollection,freebookCollection,blogCollection)
        });

        app.get("/getSingleUser/:email", async (req, res) => {
            getSingleUser(req, res, usersCollection)
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

        app.get("/writerrequest/:email", verifyJWT, verifyWriter, async (req, res) => {
            getWriterRequest(req, res, requestCollection)
        });
        app.get("/offertopublisher/:email", verifyJWT, verifyPublisher, async (req, res) => {
            getOffertoPublisher(req, res, requestCollection)
        });
        app.patch("/chat", verifyJWT, async (req, res) => {
            postChat(req, res, requestCollection)
        })
        app.get("/getchat/:id", verifyJWT, async (req, res) => {
            getChat(req, res, requestCollection)
        });

        app.patch("/postagreement", verifyJWT, verifyPublisher, async (req, res) => {
            postAgreement(req, res, requestCollection)
        })
        
        app.patch("/updateDeclineRequestbyPubliher/:id", verifyJWT, verifyPublisher, async (req, res) => {
            updateDeclineRequestbyPubliher(req, res, requestCollection)
        })
        app.patch("/writerapproval", verifyJWT, verifyWriter, async (req, res) => {
            postWriterApproval(req, res, requestCollection)
        })

        app.patch("/postuploadbook", verifyJWT, verifyPublisher, async (req, res) => {
            postUploadBook(req, res, requestCollection)
        })


        app.get("/allbooks", async (req, res) => {
            getAllBook(req, res, requestCollection)
        });
        app.get("/getBookByCategories/:category", async (req, res) => {
            getBookByCategories(req, res, requestCollection)
        });
        app.get("/getRecommededBook", async (req, res) => {
            getRecommededBook(req, res, requestCollection)
        });

        app.patch("/PostAdminApproval", verifyJWT, verifyAdmin, async (req, res) => {
            PostAdminApproval(req, res, requestCollection)
        })

        app.get("/getSingleBookdetails/:id", verifyJWT, async (req, res) => {
            getSingleBookdetails(req, res, requestCollection)
        });

        app.patch("/postreview", verifyJWT, async (req, res) => {
            postreview(req, res, requestCollection)
        })

        app.get("/getCheckDuplicateReview/:email/:id", verifyJWT, async (req, res) => {
            getCheckDuplicateReview(req, res, requestCollection)
        });
        app.get("/existsIncart/:id", verifyJWT, async (req, res) => {
            getExistsIncart(req, res, readerWriterCollection)
        });
        app.get("/getExistsInFreeBook/:id", verifyJWT, async (req, res) => {
            getExistsInFreeBook(req, res, readerWriterCollection)
        });
        app.get("/existsInPaidbook/:id", verifyJWT, async (req, res) => {
            getExistInPaidbook(req, res, readerWriterCollection)
        });
        app.patch("/addTocart", verifyJWT, async (req, res) => {
            postAddTocart(req, res, readerWriterCollection)
        })
        app.patch("/postAddToFreeBook", verifyJWT, async (req, res) => {
            postAddToFreeBook(req, res, readerWriterCollection)
        })
        app.get("/getCartItem", verifyJWT, async (req, res) => {
            getCartItem(req, res, readerWriterCollection)
        });

        app.patch("/deleteFromCart/:id", verifyJWT, async (req, res) => {
            deleteFromCart(req, res, readerWriterCollection)
        })
        app.patch("/deleteFromFreeBook/:id", verifyJWT, async (req, res) => {
            deleteFromFreeBook(req, res, readerWriterCollection)
        })

        app.patch("/postPaidBook", verifyJWT, async (req, res) => {
            postPaidBook(req, res, readerWriterCollection)
        })
        app.patch("/UpdateSoldUnit", verifyJWT, async (req, res) => {
            UpdateSoldUnit(req, res, requestCollection)
        })
        app.patch("/UpdateCartToEmpty", verifyJWT, async (req, res) => {
            UpdateCartToEmpty(req, res, readerWriterCollection)
        })

        app.get("/getPaidBook", verifyJWT, async (req, res) => {
            getPaidBook(req, res, readerWriterCollection)
        });

        app.post("/postFreeBook", verifyJWT, verifyAdmin, async (req, res) => {
            postFreeBook(req, res, freebookCollection)
        })

        app.get("/getFreeBook", verifyJWT, async (req, res) => {
            getFreeBook(req, res, freebookCollection)
        });


        app.get("/getReaderFreeBookItem", verifyJWT, async (req, res) => {
            getReaderFreeBookItem(req, res, readerWriterCollection)
        });

        app.get("/getPaymentDetails", verifyJWT, async (req, res) => {
            getPaymentDetails(req, res, readerWriterCollection)
        });

        app.patch("/updateReader", verifyJWT, async (req, res) => {
            postReaderProfileUpdate(req, res, usersCollection)
        })
        app.patch("/postWriterProfileUpdate", verifyJWT,verifyWriter, async (req, res) => {
            postWriterProfileUpdate(req, res, usersCollection)
        })

        app.post("/postWriterBlog", verifyJWT, verifyWriter, async (req, res) => {
            postWriterBlog(req, res, blogCollection)
        })

        app.get("/getAllBlog",async (req, res) => {
            getAllBlog(req, res, blogCollection)
        });
        app.patch("/PostBlogApproval", verifyJWT, async (req, res) => {
            PostBlogApproval(req, res, blogCollection)
        })
        app.get("/getSingleBlogDetails/:id", verifyJWT, async (req, res) => {
            getSingleBlogDetails(req, res, blogCollection)
        });

        
        app.get("/getWithdrawAmount", verifyJWT, async (req, res) => {
            getWithdrawAmount(req, res, usersCollection)
        });
        
        app.patch("/updateWithdrawAmount", verifyJWT, async (req, res) => {
            updateWithdrawAmount(req, res, usersCollection)
        })
        
        app.patch("/updateWithdrawHistory", verifyJWT, async (req, res) => {
            updateWithdrawHistory(req, res, usersCollection)
        })
        app.patch("/postpublisherProfileUpdate", verifyJWT,verifyPublisher, async (req, res) => {
            postpublisherProfileUpdate(req, res, usersCollection)
        })
        app.patch("/postBlockUser/:id", verifyJWT,verifyAdmin, async (req, res) => {
            postBlockUser(req, res, usersCollection)
        })

        app.post("/create-payment-intent", verifyJWT, async (req, res) => {
            const { price } = req.body;
            const amount = price * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd",
                payment_method_types: ["card"],
            });
            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        });



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

