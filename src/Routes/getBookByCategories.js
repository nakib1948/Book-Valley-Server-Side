const getBookByCategories = async (req, res, requestCollection) => {
    const category = req.params.category
    const query = {category}
    const result = await requestCollection.find(query).toArray();
    res.send(result)

}

module.exports = getBookByCategories;