const getAllBlog = async (req, res, blogCollection) => {
    const result = await blogCollection.find().toArray();
    res.send(result)

}

module.exports = getAllBlog;