
const getAllusers = async (req, res, usersCollection) => {
    const users = await usersCollection.find().toArray();
   
    res.send(users)
}

module.exports = getAllusers;