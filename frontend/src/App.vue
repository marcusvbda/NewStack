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
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import '../node_modules/element-ui/lib/theme-chalk/index.css';
  @import '../node_modules/nprogress/nprogress.css';
</style>