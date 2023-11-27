const { ObjectId } = require("mongodb");
const PostAdminApproval = async (req, res, requestCollection) => {
    const { id, status } = req.body;

    const filter = { _id: new ObjectId(id) };
    const update = {
        $set: {
            status
        }
    };
    const result = await requestCollection.updateOne(filter, update);
    res.send(result);

}

module.exports = PostAdminApproval;