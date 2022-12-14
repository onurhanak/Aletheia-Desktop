const { app, BrowserWindow } = require("electron");

const server = require("./index");

let mainWindow;

function createWindow() {
  if (process.platform === 'win32') {
    app.setAppUserModelId("Aletheia Desktop");
  }

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      plugins:true,
    },
    autoHideMenuBar: true,
    //titleBarStyle: 'hidden',
    titleBarOverlay: true,
    titleBarOverlay: {
      color: '#1d1d1d',
      symbolColor: '#fff',
      height: 30
    }
  });
  mainWindow.loadURL("http://localhost:3002");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}
console.log(app.getAppPath())
app.on("ready", createWindow);

app.on("resize", function (e, x, y) {
  mainWindow.setSize(x, y);
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});