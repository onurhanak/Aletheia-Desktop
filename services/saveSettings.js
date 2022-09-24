const fs = require("fs");

const homedir = require("os").homedir();
var dir = "/.LibgenDesktop/";
var settingsFile = "settings.json";
var downloadPath = homedir + dir;
var settingsPath = downloadPath + settingsFile;

function setSettings(mirror, theme) {
  fs.closeSync(fs.openSync(settingsPath, "a"));
  let rawSettings = fs.readFileSync(settingsPath);
  let jsonSettings = JSON.parse(rawSettings);
  if (mirror != undefined) {
    jsonSettings["mirror"] = mirror;
  }
  if (theme != undefined) {
    jsonSettings["theme"] = theme;
    applyTheme(theme);
  }
  let data = JSON.stringify(jsonSettings);
  fs.writeFileSync(settingsPath, data);
}

function readSettings() {
  let rawSettings = fs.readFileSync(settingsPath);
  let jsonSettings = JSON.parse(rawSettings);
  return [jsonSettings["theme"], jsonSettings["mirror"]];
}

function applyTheme(theme) { // need this function to be more flexible for future theme support
  var views = ["index.css", "library.css", "search.css", "settings.css"];
  if (theme == "dark") {
    for (let view of views) {
      view = "public/stylesheets/" + view;

      fs.readFile(view, "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }
        var result = data.replace(
          "@import 'theme-light.css'",
          "@import 'theme-dark.css'"
        );

        fs.writeFile(view, result, "utf8", function (err) {
          if (err) return console.log(err);
        });
      });
    }
  } else if (theme == "light") {
    for (let view of views) {
      view = "public/stylesheets/" + view; // this should not be hardcoded

      fs.readFile(view, "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }
        var result = data.replace(
          "@import 'theme-dark.css'",
          "@import 'theme-light.css'"
        );

        fs.writeFile(view, result, "utf8", function (err) {
          if (err) return console.log(err);
        });
      });
    }
  }
}

module.exports = { setSettings, readSettings };
