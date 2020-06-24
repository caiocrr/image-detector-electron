import React, { useCallback, useState, useMemo, useEffect } from "react";
import ReactDom from "react-dom";
import Button from "@material-ui/core/Button";
import {
  desktopCapturer,
  SourcesOptions,
  screen,
  remote,
  globalShortcut,
  app,
  BrowserWindow,
} from "electron";
import fs from "fs";
import "regenerator-runtime/runtime.js";
import KeyboardEventHandler from "react-keyboard-event-handler";

const mainElement = document.createElement("div");
document.body.appendChild(mainElement);

const App = () => {
  //eslint-ignore-next-line
  let [image, setImage] = useState("");
  let [width, setWidth] = useState(0);
  let [height, setHeight] = useState(0);
  const win = useMemo(
    () =>
      new remote.BrowserWindow({
        height,
        width,
        show: false,
        fullscreen: true,
        alwaysOnTop: true,
        autoHideMenuBar: true,
        enableLargerThanScreen: true,
        frame: false,
        useContentSize: true,
      }),
    []
  );

  useEffect(() => {
    win.loadFile("img.html");
    // win.webContents.on("did-finish-load", function () {
    //   win.webContents.insertCSS("html, body { margin: 0, padding: 0 }");
    // });
  }, []);

  const takeScreenshot = async () => {
    const { width, height } = remote.screen.getPrimaryDisplay().size;
    const imageConfig: SourcesOptions = {
      types: ["screen"],
      thumbnailSize: { width, height },
    };
    console.log("wi", width, height);
    let test = ((await desktopCapturer.getSources(imageConfig)) ?? [])[0]
      ?.thumbnail;
    // await win.loadURL(test.toDataURL());

    win.webContents.executeJavaScript(`setImageSrc("${test.toDataURL()}")`);
    // win.webContents.toggleDevTools();
    win.show();

    // test.thumbnail.
    // var _out = '<img src="data:image/png;base64,' + _img + '" />';
    // //render/display
    // var _target = document.getElementById('image_container');
    // _target.insertAdjacentHTML('beforeend', _out);
  };
  return (
    <>
      <KeyboardEventHandler
        handleKeys={["ESC"]}
        onKeyEvent={(key: string, e: any) => {
          console.log("AHn");
          setImage("");
          setWidth(0);
          setHeight(0);
          win.close();
          setWin();
        }}
      >
        <Button variant="contained" color="primary" onClick={takeScreenshot}>
          Hihi
        </Button>
        {image && (
          <img
            style={{
              position: "absolute",
              width: width,
              height: height,
            }}
            src={image}
          />
        )}
      </KeyboardEventHandler>
    </>
  );
};

ReactDom.render(<App />, mainElement);
