<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background: #2c3e50;
  height: 100%;
  display: grid;
  place-items: center;
}

* {
  padding: 0;
  margin: 0;
  border: 0;
}

#app {
  font-size: 40px;
}
</style>
