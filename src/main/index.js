import { app, BrowserWindow } from 'electron'
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");
const { dialog } = require('electron')

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'warn';
log.warn('App starting...');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
		    nodeIntegration: true
	  }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

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

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()

  let updater
  autoUpdater.autoDownload = false

  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Found Updates',
      message: 'Found updates, do you want update now?',
      buttons: ['Sure', 'No']
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate()
      }
      // else {
        //updater.enabled = true
        //updater = null
      // }
    })
  })

  autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
      title: 'No Updates',
      message: 'Current version is up-to-date.'
    })
    //updater.enabled = true
    //updater = null
  })

  autoUpdater.on('error', (error) => {
    dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
  })

  autoUpdater.on('download-progress', (progressObj) => {
     let log_message = "Download speed: " + progressObj.bytesPerSecond;
     log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
     log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
     dialog.showMessageBox({
       title: 'Updating Progress',
       message: 'log_message'
    })
  })

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      title: 'Install Updates',
      message: 'Updates downloaded, application will be quit for update...'
    }, () => {
      setImmediate(() => autoUpdater.quitAndInstall())
    })
  })

})
