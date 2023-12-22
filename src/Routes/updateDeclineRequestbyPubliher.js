const { ObjectId } = require("mongodb");


const updateDeclineRequestbyPubliher = async (req, res, requestCollection) => {
    const id = req.params.id
    console.log(id)
    const query = { _id: new ObjectId(id) };
    const update = {
        $set: {
            status: "declined"
        }
    };

    const result = await requestCollection.updateOne(query, update);
    res.send(result);

}

module.exports = updateDeclineRequestbyPubliher;