<template>
  <div id="#app">
    <router-view></router-view>

    <div id="messages"></div>
  </div>
</template>

<script>
  const {ipcRenderer} = require('electron')

  export default {
      mounted () {
          ipcRenderer.on('message', function (event, text) {
              var container = document.getElementById('messages')
              var message = document.createElement('div')
              message.innerHTML = text;
              container.appendChild(message);
          })
      }
  }
</script>