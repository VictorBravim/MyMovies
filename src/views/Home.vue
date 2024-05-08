<template>
    <div>
      <h1>Movie Search</h1>
      <input v-model="query" type="text" placeholder="Search for a movie..." />
      <button @click="searchMovies">Search</button>
      <movie-list :movies="searchResults" v-if="searchResults.length > 0" />
    </div>
  </template>
  
  <script>
  import MovieList from '@/components/MovieList.vue'
  import tmdbApi from '@/api/tmdb.js'
  
  export default {
    components: {
      MovieList
    },
    data() {
      return {
        query: '',
        searchResults: []
      }
    },
    methods: {
      async searchMovies() {
        if (this.query.trim() !== '') {
          try {
            const movies = await tmdbApi.searchMovies(this.query)
            this.searchResults = movies
          } catch (error) {
            console.error('Error searching movies:', error.message)
          }
        }
      }
    }
  }
  </script>
  