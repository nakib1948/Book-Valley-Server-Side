
const getAllStatistic = async (req, res, usersCollection,requestCollection,readerWriterCollection,freebookCollection,blogCollection) => {
    const users = await usersCollection.find().toArray();
    let writer=0,reader=0,publisher=0;
    await users.forEach(element => {
        if(element.role==='writer') writer++;
        else if(element.role==='reader') reader++;
        else if(element.role==='publisher')publisher++;
    });
    const userInfo = {writer,reader,publisher}
   
    res.send(userInfo)
}

module.exports = getAllStatistic;