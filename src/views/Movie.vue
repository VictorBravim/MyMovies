<template>
    <div>
      <movie-details :movie="movie" v-if="movie" />
    </div>
  </template>
  
  <script>
  import MovieDetails from '@/components/MovieDetails.vue'
  import { mapActions, mapState } from 'vuex'
  import tmdbApi from '@/api/tmdb.js'
  
  export default {
    components: {
      MovieDetails
    },
    data() {
      return {
        movie: null
      }
    },
    async created() {
      const movieId = this.$route.params.id
      try {
        const movie = await tmdbApi.getMovieDetails(movieId)
        this.movie = movie
      } catch (error) {
        console.error('Error getting movie details:', error.message)
      }
    },
    methods: {
      ...mapActions(['addToFavorites'])
    }
  }
  </script>
  