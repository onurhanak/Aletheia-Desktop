function post(path, filename, filetype, link,filesize,author,coverlink,bookname) {
    filename=filename.trim()
    filename = filename.replace(':', '')
    filename = filename.replace('?', '')
    filename = filename.replace('!', '')
    filename = filename.replace(new RegExp(" ",'g'), '_')
    filename=filename+'.'+filetype
    $.ajax(path, {
    type: 'POST',
    data: {
      filename: filename,
      dl: link,
      filetype:filetype,
      filesize:filesize,
      author:author,
      coverlink:coverlink,
      bookname:bookname
      
    }
  })
 }