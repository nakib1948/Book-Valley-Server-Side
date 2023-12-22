const getApprovedBooks = async (req, res, requestCollection) => {
    const query = {status:"approved"}
    const result = await requestCollection.find(query).toArray();
    res.send(result)

}

module.exports = getApprovedBooks;