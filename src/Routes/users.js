
const createUser = async(req,res,usersCollection)=>{
    const user = req.body;
    const query = { email: user.email };
    const existingUser = await usersCollection.findOne(query);

    if (existingUser) {
      return res.send({ message: "user already exists" });
    }

    const result = await usersCollection.insertOne(user);
    res.send(result);
}

module.exports = createUser;