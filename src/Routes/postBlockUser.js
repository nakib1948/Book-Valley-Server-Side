const { ObjectId } = require("mongodb");
const postBlockUser = async (req, res, usersCollection) => {
    const id = req.params.id;

    const {block} = req.body

    const filter = { _id: new ObjectId(id) };
    const update = {
        $set: {
            isDeleted:block
        }
    };
    const result = await usersCollection.updateOne(filter, update);
    res.send(result);

}

module.exports = postBlockUser;