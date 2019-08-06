import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'


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

if (process.env.NODE_ENV === 'production'){
    const log = require('electron-log');
    const {autoUpdater} = require("electron-updater");
    //autoUpdater.logger = log;
    //autoUpdater.logger.transports.file.level = 'info';
    //log.info('App starting...');
    alert('App starting...')

    autoUpdater.checkForUpdates();
    autoUpdater.on('checking-for-update', () => {
      alert('Checking for update')
    })
    autoUpdater.on('update-available', (info) => {
      alert('Update available')
    })
    autoUpdater.on('update-not-available', (info) => {
      alert('Update not available')
    })
    autoUpdater.on('error', (err) => {
      alert('Error: ' + err)
    })
    autoUpdater.on('update-downloaded', (info) => {
      alert('Update downloaded')
      autoUpdater.quitAndInstall();
    })
}
