<template>
  <div id="app">
    <boheader></boheader>
    <router-view></router-view>
  </div>
</template>
<style>
  .click-confirm { display: inline-block;display: inline-block !important; }
  @import "~selectize/dist/css/selectize.css";
  @import "~selectize/dist/css/selectize.bootstrap3.css";
  </style>
<script>
  import Boheader from 'components/Boheader'

  export default {
    components: {
      Boheader,
    }
  }
</script>
