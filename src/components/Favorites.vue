<template>
    <div>
      <h2>Favorite Movies</h2>
      <div v-if="favorites.length === 0">No favorite movies added yet.</div>
      <div v-else>
        <div v-for="movie in favorites" :key="movie.id">
          <h3>{{ movie.title }}</h3>
          <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt="Movie Poster" />
          <button @click="removeFromFavorites(movie.id)">Remove from Favorites</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      favorites() {
        return this.$store.state.favorites
      }
    },
    methods: {
      removeFromFavorites(movieId) {
        this.$store.dispatch('removeFromFavorites', movieId)
      }
    }
  }
  </script>
  