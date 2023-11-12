
const getAllPublisher = async (req, res, usersCollection) => {
    
    const query = { role: 'publisher' };
    const publisher = await usersCollection.find(query).toArray();
    res.send(publisher)
    
}

module.exports = getAllPublisher;