function setSelected(elem) {
    var selected = document.getElementById(elem)
    selected.setAttribute('selected','')
}

window.onload = function() {
    setSelected(theme);
    setSelected(mirror);
};