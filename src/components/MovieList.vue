<template>
    <div>
      <h2>Results</h2>
      <div v-if="movies.length === 0">No results found.</div>
      <div v-else>
        <div v-for="movie in movies" :key="movie.id">
          <h3>{{ movie.title }}</h3>
          <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt="Movie Poster" />
          <router-link :to="'/movie/' + movie.id">View Details</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      movies: {
        type: Array,
        default: () => []
      }
    }
  }
  </script>
  