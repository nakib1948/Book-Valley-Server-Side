
const getPaymentDetails = async (req, res, readerWriterCollection) => {
    const query = { email: req.decoded.email };
    const result = await readerWriterCollection.findOne(query);
    res.send(result.payment)
    
}

module.exports = getPaymentDetails;