<template>
  <div id="app">
    <NavbarMenu />
    <HeroSection />
    <MovieList />
  </div>
</template>

<script>
import NavbarMenu from './components/NavbarMenu.vue';
import HeroSection from './components/HeroSection.vue';
import MovieList from './components/MovieList.vue';

export default {
  components: {
    NavbarMenu,
    HeroSection,
    MovieList
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  color: #fff;
  background: #18181D;
}

::-webkit-scrollbar {
  width: 0px;
}
</style>