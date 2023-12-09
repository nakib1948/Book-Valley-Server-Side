
const createUser = async (req, res, usersCollection, readerWriterCollection) => {
  const user = req.body;
  const query = { email: user.email };
  const reader = {
    name: user.name,
    email: user.email,
    cart: [],
    payment: [],
    freeBook: [],
    paidBook:[]
  }
  const existingUser = await usersCollection.findOne(query);

  if (existingUser) {
    return res.send({ message: "user already exists" });
  }

  const result = await usersCollection.insertOne(user);
  if (await user.role !== "publisher" && user.role!=="writer") {
    await readerWriterCollection.insertOne(reader)

  }
  res.send(result);
}

module.exports = createUser;