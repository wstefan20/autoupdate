import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import AppUpdater from './AppUpdater'
// const log = require('electron-log');
// const {autoUpdater} = require("electron-updater");

// autoUpdater.logger = log;
// autoUpdater.logger.transports.file.level = 'info';
// log.info('App starting...');

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

// app.on('ready', function()  {
//   autoUpdater.checkForUpdates();
// });
// autoUpdater.on('checking-for-update', () => {
// })
// autoUpdater.on('update-available', (info) => {
// })
// autoUpdater.on('update-not-available', (info) => {
// })
// autoUpdater.on('error', (err) => {
// })
// autoUpdater.on('download-progress', (progressObj) => {
// })
// autoUpdater.on('update-downloaded', (info) => {
//   autoUpdater.quitAndInstall();
// })
