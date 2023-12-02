const getPaidBook = async (req, res, readerWriterCollection) => {
    const query = { email: req.decoded.email };
    const result = await readerWriterCollection.findOne(query);
    res.send(result.paidBook)
    
}

module.exports = getPaidBook;