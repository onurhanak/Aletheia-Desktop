const fs = require('fs')

const homedir = require('os').homedir();
var dir = '/.LibgenDesktop/'
var settingsFile='settings.json'
var downloadPath = homedir+dir
var settingsPath = downloadPath+settingsFile

function setSettings(mirror, theme) {
    fs.closeSync(fs.openSync(settingsPath, 'a'))
    let rawSettings = fs.readFileSync(settingsPath);
    let jsonSettings = JSON.parse(rawSettings)
    if (mirror!=undefined) {
        jsonSettings['mirror'] = mirror
    } 
    if (theme != undefined) {
        jsonSettings['theme'] = theme
    }
    let data = JSON.stringify(jsonSettings)
    fs.writeFileSync(settingsPath, data);
}

function readSettings() {
    let rawSettings = fs.readFileSync(settingsPath);
    let jsonSettings = JSON.parse(rawSettings)
    return [jsonSettings['theme'],jsonSettings['mirror']]
}

module.exports = { setSettings, readSettings };
