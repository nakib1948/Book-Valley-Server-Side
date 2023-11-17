
const postBookRequest = async (req, res, requestCollection) => {
    const bookRequests = req.body;

    const result = await requestCollection.insertOne(bookRequests);
    res.send(result);
}

module.exports = postBookRequest;