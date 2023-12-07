const postReaderProfileUpdate = async (req, res, usersCollection) => {
    const { name, image } = req.body;

    const filter = { email: req.decoded.email };
    const update = {
        $set: {
            name,
            image
        }
    };
    const result = await usersCollection.updateOne(filter, update);
    res.send(result);

}

module.exports = postReaderProfileUpdate;