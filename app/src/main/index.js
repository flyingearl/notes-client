'use strict'

import { app, BrowserWindow, dialog } from 'electron'
const {autoUpdater} = require('electron-updater')

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function sendStatusToWindow(text) {
    mainWindow.webContents.send('message', text);
}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow()

  mainWindow.maximize()

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

    if (process.env.NODE_ENV !== 'development') {
        autoUpdater.checkForUpdates()
    }

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')
}

autoUpdater.on('checking-for-update', () => {
    // sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (ev, info) => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Update Found',
        message: 'A new update is available. This will download now and install shortly.'
    });
})
autoUpdater.on('update-not-available', (ev, info) => {
    // sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (ev, err) => {
    sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (ev, progressObj) => {
    sendStatusToWindow(`Download progress... ${progressObj}`);
})
autoUpdater.on('update-downloaded', (ev, info) => {
    sendStatusToWindow('Update downloaded; will install in 5 seconds');
})

autoUpdater.on('update-downloaded', (ev, info) => {
    // Wait 5 seconds, then quit and install
    // In your application, you don't need to wait 5 seconds.
    // You could call autoUpdater.quitAndInstall(); immediately
    setTimeout(function() {
        autoUpdater.quitAndInstall();
    }, 5000)
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
