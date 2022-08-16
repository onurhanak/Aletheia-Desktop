window.addEventListener('load', clearStuff)

function clearStuff() {
    var searchBox = document.getElementById('search-query')
    searchBox.value=''
}

function getSearchTerm() {
    var searchTerm = document.getElementById('search-query').value
    location.href("www.google.com:"+searchTerm);
    console.log('working')
}