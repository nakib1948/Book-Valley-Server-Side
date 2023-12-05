const getExistInPaidbook = async (req, res, readerWriterCollection) => {
    const _id = req.params.id;
    const query = {
        paidBook: {
            $elemMatch: { _id: _id }
        }, email: req.decoded.email
    };

    const result = await readerWriterCollection.find(query).toArray();
    if (result.length > 0) {
        res.send({ exists: true });
    } else {
        res.send({ exists: false });
    }
}

module.exports = getExistInPaidbook;