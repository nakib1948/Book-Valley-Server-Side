const { ObjectId } = require("mongodb");
const UpdateSoldUnit = async (req, res, requestCollection) => {
    const data  = req.body;

    const getAllId = data.map(({ _id }) => new ObjectId(_id));

    const query = {
        _id: { $in: getAllId }
    };

    const update = {
        $inc: {
            soldUnit: 1
        }
    };


    const result = await requestCollection.updateMany(query, update);
    res.send(result);

}

module.exports = UpdateSoldUnit;