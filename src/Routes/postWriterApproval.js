const { ObjectId } = require("mongodb");
const postWriterApproval = async (req, res, requestCollection) => {
    const { id } = req.body;

    const filter = { _id: new ObjectId(id) };
    const update = {
        $set: {
            writerApproval:"approved"
        }
    };
    const result = await requestCollection.updateOne(filter, update);
    res.send(result);

}

module.exports = postWriterApproval;