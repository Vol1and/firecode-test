<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name: 'Gallery'}">Gallery</router-link>
      <router-link :to="{name: 'AddPhoto'}">Add photo</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50


#nav
  padding: 20px

  a
    margin-right: 15px
    font-size: 30px
    font-weight: bold
    color: #2c3e50
    &.router-link-exact-active
      color: #42b983


</style>
