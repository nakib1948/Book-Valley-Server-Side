
const { ObjectId } = require("mongodb");
const getSingleBlogDetails = async (req, res, blogCollection) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await blogCollection.findOne(query);
    res.send(result)
    
}

module.exports = getSingleBlogDetails;