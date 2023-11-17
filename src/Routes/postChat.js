const { ObjectId } = require("mongodb");
const postChat = async (req, res, requestCollection) => {
    const { id, role, chat } = req.body;
    const message = { role, chat }


    const filter = { _id: new ObjectId(id) };
    const update = {
        $push: {
            chat: message
        }
    };
    const result = await requestCollection.updateOne(filter, update);
    res.send(result);

}

module.exports = postChat;