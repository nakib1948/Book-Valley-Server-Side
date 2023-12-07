const getReaderFreeBookItem = async (req, res, readerWriterCollection) => {
    const result = await readerWriterCollection.findOne({email: req.decoded.email});
   
    res.send(result?.freeBook)
}

module.exports = getReaderFreeBookItem;