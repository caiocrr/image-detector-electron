import { app, BrowserWindow, remote, globalShortcut } from "electron";
import * as path from "path";
import * as url from "url";
const electronLocalshortcut = require("electron-localshortcut");

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(`http://localhost:4000`);
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  globalShortcut.register("ESC", () => {
    let wins = BrowserWindow.getAllWindows();
    if (wins?.length > 0) {
      wins.filter((x) => x.isAlwaysOnTop()).map((x) => x.hide());
    }
  });
}

app.on("ready", createWindow);
app.allowRendererProcessReuse = true;
