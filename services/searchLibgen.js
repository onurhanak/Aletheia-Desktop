const axios = require("axios");
const cheerio = require("cheerio");

async function parseResults(data) {
  let $ = cheerio.load(data);
  $("i").remove();
  var rows = $("tr");
  var giantList = [];
  for (let row of rows) {
    var myList = [];
    rowCheerio = cheerio.load(row);
    rds = rowCheerio("td");
    for (let rd of rds) {
      rdCheerio = cheerio.load(rd);
      rdText = rdCheerio.text();
      myList.push(rdText);
    }
    myList = myList.slice(0, -4);
    giantList.push(myList);
  }
  giantList.splice(giantList.length - 1);
  giantList.splice(0, 3);
  return giantList;
}

async function buildBooks(booksList) {
  booksObjList = [];
  idList = [];
  for (let book of booksList) {
    newBook = new Book(book);
    idList.push(book[0]);
    booksObjList.push(newBook);
  }
  return [booksObjList, idList];
}

async function generateUrlString(idList) {
  var urlString = "";
  for (let x = 0; x < idList.length; x++) {
    urlString = urlString + idList[x] + ",";
  }

  console.log("Getting data");
  var md5_olid = [];

  await axios
    .get(
      "https://libgen.is/json.php?ids=" +
        urlString +
        "&fields=id,md5,openlibraryid"
    )
    .then(async function (response) {
      for (let y = 0; y < response.data.length; y++) {
        var tempList = [];
        var md5 = response.data[y].md5;
        var olid = response.data[y].openlibraryid;
        var id = response.data[y].id;
        tempList.push(id);
        tempList.push(md5);
        tempList.push(olid);
        md5_olid.push(tempList);
        //var downloadUrl="http://62.182.86.140/main/"+downloadID+'/'+md5+'/'
      }
    });

  return md5_olid;
}

class Book {
  constructor(attrList) {
    this.id = attrList[0];
    this.author = attrList[1];
    this.title = attrList[2];
    this.year = attrList[4];
    this.pages = attrList[5];
    this.language = attrList[6];
    this.filesize = attrList[7];
    this.filetype = attrList[8];
  }
}

async function assignProperties(md5_olid, objList) {
  for (let md5s of md5_olid) {
    for (let obj of objList) {
      if (obj.id == md5s[0]) {
        obj.md5 = md5s[1];
        obj.olid = md5s[2];
      }
    }
  }
  return objList;
}

async function addDownloadLink(completeList) {
  for (let obj of completeList) {
    var downloadID = obj.id.slice(0, -3).toString() + "000";
    var downloadUrl =
      "http://62.182.86.140/main/" + downloadID + "/" + obj.md5 + "/";
    if (obj.olid.length > 3) {
      var coverUrl =
        "https://covers.openlibrary.org/b/olid/" + obj.olid + "-L.jpg";
    } else {
      var coverUrl = "/images/not_found.jpg";
    }
    obj.downloadLink = downloadUrl;
    obj.coverLink = coverUrl;
  }
  return completeList;
}

async function searchLibgen(query, mirror, column) {
  return new Promise(async function (resolve, reject) {
    var searchUrl =
      "https://" +
      mirror +
      "/search.php?req=" +
      query +
      "&lg_topic=libgen&open=0&view=simple&res=50&phrase=1&column=" +
      column;
    await axios.get(searchUrl).then(async function (response) {
      var results = await parseResults(response.data);
      var objList_idList = await buildBooks(results);
      var objList = objList_idList[0];
      var idList = objList_idList[1];
      var md5_olid = await generateUrlString(idList);
      var completeList = await assignProperties(md5_olid, objList);
      var completeListWithDL = await addDownloadLink(completeList);
      resolve(completeListWithDL);
    });
  });
}

module.exports = { searchLibgen };
