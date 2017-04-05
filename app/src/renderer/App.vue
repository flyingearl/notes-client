<template>
  <div id="#app">
    <navigation></navigation>

    <div class="container-fluid" v-if="!updateHidden">
      <div class="col-md-4 pull-right">
        <div class="alert alert-info alert-dismissible" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div id="messages"></div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  const {ipcRenderer} = require('electron')

  export default {
      data () {
          return {
              updateHidden: true
          }
      },
      mounted () {
          ipcRenderer.on('message', function (event, text) {
              this.updateHidden = false
              var container = document.getElementById('messages')
              var message = document.createElement('div')
              message.innerHTML = text;
              container.appendChild(message);
          })
      }
  }
</script>