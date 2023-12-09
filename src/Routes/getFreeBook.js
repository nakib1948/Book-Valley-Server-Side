const getFreeBook = async (req, res, freebookCollection) => {
    const result = await freebookCollection.find().toArray();
   
    res.send(result)
    
}

module.exports = getFreeBook;