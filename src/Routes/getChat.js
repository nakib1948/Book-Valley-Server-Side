const { ObjectId } = require("mongodb");
const getChat = async (req, res, requestCollection) => {
    const id = req.params.id;
  
    const query = { _id: new ObjectId(id) };
    const message = await requestCollection.find(query).toArray();
    res.send(message[0].chat)
    
}

module.exports = getChat;