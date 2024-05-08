<template>
    <div v-if="movie">
      <h2>{{ movie.title }}</h2>
      <p>{{ movie.overview }}</p>
      <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt="Movie Poster" />
      <button @click="addToFavorites(movie)">Add to Favorites</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      movie: {
        type: Object,
        default: () => null
      }
    },
    methods: {
      addToFavorites(movie) {
        this.$store.dispatch('addToFavorites', movie)
      }
    }
  }
  </script>
  