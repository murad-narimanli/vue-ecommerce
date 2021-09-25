<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/elements/Header/Header";

export default {
  name: 'App',
  components: {
    Header,
  },
  beforeMount() {
    !localStorage.getItem('cart') && localStorage.setItem('cart', JSON.stringify([]))
  },
}
</script>
