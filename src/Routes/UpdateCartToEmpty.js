const UpdateCartToEmpty = async (req, res, readerWriterCollection) => {
    const query = {
        email: req.decoded.email
    };

    const update = {
        $set: {
            cart: [] 
        }
    };

    const result = await readerWriterCollection.updateOne(query, update);
    res.send(result);

}

module.exports = UpdateCartToEmpty;