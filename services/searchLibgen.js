const axios = require('axios');
const cheerio = require('cheerio');

async function searchLibgen(query) {
    return new Promise(async function (resolve, reject) {
        var searchUrl = 'https://libgen.is/search.php?req='+ query +'&lg_topic=libgen&open=0&view=simple&res=25&phrase=1&column=def'
        await axios.get(searchUrl)
        .then(async function(response) {
            var results = await parseResults(response.data)
            var objList = await buildBooks(results)
            var completeList = await addDownloadLink(objList)
            resolve(completeList)
        })
    })
}

async function parseResults(data) {
    let $ = cheerio.load(data);
    $('i').remove();
    var rows = $('tr')
    var giantList = []
    for (let row of rows) {
        var myList =[]
        rowCheerio = cheerio.load(row)
        rds = rowCheerio('td')
        for (let rd of rds) {
            rdCheerio = cheerio.load(rd)
            rdText=rdCheerio.text()
            myList.push(rdText)
        }
        myList = myList.slice(0, -4)
        giantList.push(myList)

    }
    giantList.splice(giantList.length-1, )
    giantList.splice(0, 3)
    return giantList
}

async function buildBooks(booksList) {
    booksObjList=[]
    for (let book of booksList) {
        newBook = new Book(book)
        booksObjList.push(newBook)
    }
    return booksObjList
}

async function addDownloadLink(bookList) {
    completeList=[]
    for (let x=0;x<bookList.length;x++) {
        var id = bookList[x].id
        var downloadID = id.slice(0,-3).toString()+'000'
        await axios.get('https://libgen.is/json.php?ids='+id+'&fields=md5,openlibraryid')
        .then(async function(response) {
            var md5 = response.data[0].md5
            var olid = response.data[0].openlibraryid
            var downloadUrl="http://62.182.86.140/main/"+downloadID+'/'+md5+'/'
            bookList[x].downloadLink = downloadUrl
            var coverUrl = 'https://covers.openlibrary.org/b/olid/'+ olid +'-L.jpg'
            bookList[x].coverLink = coverUrl
            completeList.push(bookList[x])
        })
    }
    return completeList
}

class Book {
    constructor(attrList) {
        this.id=attrList[0]
        this.author=attrList[1]
        this.title=attrList[2]
        this.year=attrList[4]
        this.pages=attrList[5]
        this.language=attrList[6]
        this.filesize=attrList[7]
        this.filetype=attrList[8]
    }
}

module.exports = searchLibgen;



module.exports = { searchLibgen };

