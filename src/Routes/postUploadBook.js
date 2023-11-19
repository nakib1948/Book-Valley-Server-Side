const { ObjectId } = require("mongodb");
const postUploadBook = async (req, res, requestCollection) => {
    const { id,bookCoverPhoto,bookCopy } = req.body;

    const filter = { _id: new ObjectId(id) };
    const update = {
        $set: {
            bookCoverPhoto,
            bookCopy
        }
    };
    const result = await requestCollection.updateOne(filter, update);
    res.send(result);

}

module.exports = postUploadBook;