const postpublisherProfileUpdate = async (req, res, usersCollection) => {
    const { name, image, phone, bankDetails, bankAccount, location, website, facebook
        , twitter, linkedin, instragram, description } = req.body;

    const filter = { email: req.decoded.email };
    const update = {
        $set: {
            name,
            image,
            phone,
            bankAccount,
            bankDetails,
            location,
            website,
            facebook,
            twitter,
            linkedin,
            instragram,
            description
        }
    };
    const result = await usersCollection.updateOne(filter, update);
    res.send(result);

}

module.exports = postpublisherProfileUpdate;