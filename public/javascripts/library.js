function search() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchLibrary');
    filter = input.value.toUpperCase();
    library = document.getElementById("library");
    results = library.getElementsByClassName('result-card');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < results.length; i++) {
      title = results[i].getElementsByTagName("p")[0];
      txtValue = title.textContent || title.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        results[i].style.display = "";
      } else {
        results[i].style.display = "none";
      }
    }
  }

  function post(path, command, filePath) {
    $.ajax(path, {
    type: 'POST',
    data: {
      command: command,
      filePath: filePath    
    }
  })
 }


window.onload=function() {
  if (books.length === 0) {
          var noBooks = document.createElement('p')
          noBooks.innerText='There are no books in your library yet, go download some!'
          noBooks.id='noBooks'
          var library = document.getElementById('content')
          library.innerHTML=''
          library.style.justifyContent='center'
          library.style.alignItems='center'
          library.append(noBooks)
      }
  }