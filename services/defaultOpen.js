function getOpenCommand() {
    switch (process.platform) { 
       case 'darwin' : return 'open';
       case 'win32' : return 'start';
       case 'win64' : return 'start';
       default : return 'xdg-open';
    }
 }

 module.exports = { getOpenCommand };
