const getFreeBook = async (req, res, freebookCollection) => {
    const result = await freebookCollection.find().toArray();
    console.log(result)
    res.send(result)
    
}

module.exports = getFreeBook;