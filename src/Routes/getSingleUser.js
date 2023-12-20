const { ObjectId } = require("mongodb");
const getSingleUser = async (req, res, usersCollection) => {
    const email = req.params.email;
    const query = { email };
    const result = await usersCollection.findOne(query);
    res.send(result)
    
}

module.exports = getSingleUser;