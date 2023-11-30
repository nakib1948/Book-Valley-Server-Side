const getCartItem = async (req, res, readerWriterCollection) => {
    const result = await readerWriterCollection.findOne({email: req.decoded.email});
   
    res.send(result.cart)
}

module.exports = getCartItem;