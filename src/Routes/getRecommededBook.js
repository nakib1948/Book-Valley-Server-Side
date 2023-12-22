
const getRecommededBook = async (req, res, requestCollection) => {
    const categoriesString = req.query.category;
    const categoriesArray = categoriesString.split(',');
    const query = { category: { $in: categoriesArray },status:"approved" };
    const result = await requestCollection.find(query).toArray();
    res.send(result)
    
}

module.exports = getRecommededBook;