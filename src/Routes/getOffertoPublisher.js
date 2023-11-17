
const getOffertoPublisher = async (req, res, requestCollection) => {
    const email = req.params.email;
    if (req.decoded.email != email) {
        return res.status(401).send({ message: "unauthorized access" });
    }

    const query = { publisherEmail: email };
    const result = await requestCollection.find(query).toArray();

    res.send(result);

}

module.exports = getOffertoPublisher;