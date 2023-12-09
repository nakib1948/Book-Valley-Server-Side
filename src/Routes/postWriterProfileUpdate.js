const postWriterProfileUpdate = async (req, res, usersCollection) => {
    const { name, image,phone,bankDetails,bankAccount } = req.body;

    const filter = { email: req.decoded.email };
    const update = {
        $set: {
            name,
            image,
            phone,
            bankAccount,
            bankDetails
        }
    };
    const result = await usersCollection.updateOne(filter, update);
    res.send(result);

}

module.exports = postWriterProfileUpdate;