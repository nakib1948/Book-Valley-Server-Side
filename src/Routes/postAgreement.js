const { ObjectId } = require("mongodb");
const postAgreement = async (req, res, requestCollection) => {
    const { id, percentage, bookPrice, bookCopy } = req.body;

    const filter = { _id: new ObjectId(id) };
    const update = {
        $set: {
            percentage, bookPrice, bookCopy
        }
    };
    const result = await requestCollection.updateOne(filter, update);
    res.send(result);

}

module.exports = postAgreement;