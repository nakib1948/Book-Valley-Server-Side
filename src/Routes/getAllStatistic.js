
const getAllStatistic = async (req, res, usersCollection,requestCollection,readerWriterCollection,freebookCollection,blogCollection) => {
    const users = await usersCollection.find().toArray();
    let writer=0,reader=0,publisher=0;
    await users.forEach(element => {
        if(element.role==='writer') writer++;
        else if(element.role==='reader') reader++;
        else if(element.role==='publisher')publisher++;
    });
    const userInfo = {writer,reader,publisher}

    const totalBlog = await blogCollection.find().toArray()
    const freeBook = await freebookCollection.find().toArray()

    let booksold=0, premimumBook=0,totalEarning=0;
    const publishedBookData = await requestCollection.find().toArray();
    await publishedBookData.forEach(element=>{
        if(element.status==='approved'){
            premimumBook++;
            booksold+=element.soldUnit;
            totalEarning+= (element.soldUnit*element.bookPrice*(0.05))
        }
    })

    const publishedBook={booksold,premimumBook,totalEarning}
    res.send({userInfo,totalBlog:totalBlog.length,freeBook:freeBook.length,publishedBook})
}
 
module.exports = getAllStatistic;