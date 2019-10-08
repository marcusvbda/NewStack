<template>
  <div id="app">
    <title>{{$constants.app_title}}</title>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import './styles/app.scss';
</style>