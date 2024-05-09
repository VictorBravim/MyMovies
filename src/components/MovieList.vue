<template>
  <div>
    <h2>Filmes Populares</h2>

    <!-- Campo de pesquisa -->
    <input type="text" v-model="query" placeholder="Buscar filmes...">
    <button @click="searchMovies">Buscar</button>

    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
      query: ''
    };
  },
  methods: {
    async searchMovies() {
      const apiKey = '9d613a549275367434c92bddbd15e9ae';
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.query}`;

      try {
        const response = await axios.get(url);
        this.movies = response.data.results;
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    }
  },
  async mounted() {
    await this.searchMovies();
  }
};
</script>
