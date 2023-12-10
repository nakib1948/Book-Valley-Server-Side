const getWithdrawHistory = async (req, res, usersCollection) => {
    const result = await usersCollection.findOne({email:req.decoded.email})
    res.send(result)
}

module.exports = getWithdrawHistory;