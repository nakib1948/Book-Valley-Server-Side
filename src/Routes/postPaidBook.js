const postPaidBook = async (req, res, readerWriterCollection) => {
    const {data,payment} = req.body;
    
    const query = {
        email: req.decoded.email
      };
      
      const update = {
        $push: {
          paidBook: {
            $each: data
          },
          payment
        }
      };
      
    const result = await readerWriterCollection.updateOne(query, update);
    res.send(result);

}

module.exports = postPaidBook;