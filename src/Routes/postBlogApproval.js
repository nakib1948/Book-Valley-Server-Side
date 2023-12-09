const { ObjectId } = require("mongodb");
const PostBlogApproval = async (req, res, blogCollection) => {
    const { id, status } = req.body;

    const filter = { _id: new ObjectId(id) };
    const update = {
        $set: {
            status
        }
    };
    const result = await blogCollection.updateOne(filter, update);
    res.send(result);

}

module.exports = PostBlogApproval;