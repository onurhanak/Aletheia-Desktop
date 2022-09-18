'use strict';
var packager = require('electron-packager');
var options = {
    'arch': 'x64',
    'platform': 'win32',
    'dir': './',
    'app-copyright': 'Onurhan Ak',
    'app-version': '0.0.1',
    'asar': false,
    'icon': './university.ico',
    'name': 'Aletheia',
    'out': './dist',
    'overwrite': true,
    'prune': true,
    'version': '0.0.1',
    'version-string': {
        'CompanyName': 'Onurhan Ak',
        'FileDescription': 'Aletheia Desktop', /*This is what display windows on task manager, shortcut and process*/
        'OriginalFilename': 'Aletheia Desktop',
        'ProductName': 'Aletheia Desktop',
        'InternalName': 'Aletheia Desktop'
    }
};
packager(options, function done_callback(err, appPaths) {
    console.log("Error: ", err);
    console.log("appPaths: ", appPaths);
});