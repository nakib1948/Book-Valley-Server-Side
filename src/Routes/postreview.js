const { ObjectId } = require("mongodb");
const postreview = async (req, res, requestCollection) => {
    const { id, name, rating,review,email,userImg } = req.body;
    const message = { name,email,rating,review,userImg }

    const filter = { _id: new ObjectId(id) };
    const update = {
        $push: {
            review: message
        }
    };
    const result = await requestCollection.updateOne(filter, update);
    res.send(result);

}

module.exports = postreview;