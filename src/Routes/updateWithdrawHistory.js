const updateWithdrawHistory = async (req, res, usersCollection) => {
    const body = req.body;


    const filter = { email:req.decoded.email};
    const update = {
        $push: {
            withdrawHistory: body
        }
    };
    const result = await usersCollection.updateOne(filter, update);
    res.send(result);

}

module.exports = updateWithdrawHistory;