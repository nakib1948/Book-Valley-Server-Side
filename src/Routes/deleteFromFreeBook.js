

const deleteFromFreeBook = async (req, res, readerWriterCollection) => {
    const id = req.params.id;
    const query = { email: req.decoded.email };
    const update = {
      $pull: {
        freeBook: { _id: id }
      }
    };
    
    const result = await readerWriterCollection.updateOne(query, update);
    res.send(result);

}

module.exports = deleteFromFreeBook;