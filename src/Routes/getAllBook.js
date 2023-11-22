const getAllBook = async (req, res, requestCollection) => {
    const result = await requestCollection.find().toArray();
    res.send(result)

}

module.exports = getAllBook;