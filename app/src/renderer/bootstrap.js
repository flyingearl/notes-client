window.$ = window.jQuery = require('jquery')
require('bootstrap')
import 'bootstrap/dist/css/bootstrap.css'

window.Vue = require('vue')
window.Electron = require('vue-electron')

window.axios = require('axios')

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
}