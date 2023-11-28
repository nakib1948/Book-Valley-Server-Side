const { ObjectId } = require("mongodb");
const getSingleBookdetails = async (req, res, requestCollection) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await requestCollection.findOne(query);
    res.send(result)
    
}

module.exports = getSingleBookdetails;