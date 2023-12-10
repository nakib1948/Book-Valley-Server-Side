
const updateWithdrawAmount = async (req, res, usersCollection) => {
    const {amount}  = req.body;
    const query = {
        email:req.decoded.email 
    };

    const update = {
        $set: {
            withdraw: amount
        }
    };


    const result = await usersCollection.updateOne(query, update);
    res.send(result);

}

module.exports = updateWithdrawAmount;