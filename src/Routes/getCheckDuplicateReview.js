const { ObjectId } = require("mongodb");
const getCheckDuplicateReview = async (req, res, requestCollection) => {
    const id = req.params.id;
    const email = req.params.email;
   
    const query = { _id: new ObjectId(id),'review.email': email };
    const result = await requestCollection.findOne(query)
    res.send(result)

}

module.exports = getCheckDuplicateReview;