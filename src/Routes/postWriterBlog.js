const postWriterBlog = async (req, res, blogCollection) => {
    const data = req.body;
    const result = await blogCollection.insertOne(data);
    res.send(result);
}

module.exports = postWriterBlog;