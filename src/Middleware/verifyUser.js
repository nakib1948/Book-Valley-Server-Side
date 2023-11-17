// Middleware/verifyUser.js
const verifyAdmin = async (usersCollection) => async (req, res, next) => {
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

const verifyWriter = async (usersCollection) => async (req, res, next) => {
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

const verifyPublisher = async (usersCollection) => async (req, res, next) => {
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

module.exports = { verifyAdmin, verifyWriter, verifyPublisher };
