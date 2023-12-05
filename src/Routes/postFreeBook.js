


const postFreeBook = async (req, res, freebookCollection) => {
    const book = req.body;
    const result = await freebookCollection.insertOne(book);
    res.send(result);
}

module.exports = postFreeBook;