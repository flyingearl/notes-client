'use strict'

import { app, BrowserWindow, dialog } from 'electron'
var log = require('electron-log')
const {autoUpdater} = require('electron-updater')

log.info('App starting...');

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function sendStatusToWindow(text) {
    log.info(text)
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
    sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (ev, info) => {
    sendStatusToWindow('update available: ' + info);
    dialog.showMessageBox({
        type: 'info',
        title: 'Update Found',
        message: 'A new update is available. This will download now and install shortly.'
    });
})
autoUpdater.on('update-not-available', (ev, info) => {
    sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (ev, err) => {
    sendStatusToWindow('Error in auto-updater: ' + err);
})
autoUpdater.on('download-progress', (ev, progressObj) => {
    sendStatusToWindow(`Download progress... ${progressObj}`);
})
autoUpdater.on('update-downloaded', (ev, info) => {
    sendStatusToWindow('Update downloaded; will install in 5 seconds: ' + info);
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
