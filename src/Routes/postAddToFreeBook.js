
const postAddToFreeBook = async (req, res, readerWriterCollection) => {
    const data = req.body;

    const filter = { email: req.decoded.email };
    const update = {
        $push: {
            freeBook: data
        }
    };
    const result = await readerWriterCollection.updateOne(filter, update);
    res.send(result);

}

module.exports = postAddToFreeBook;