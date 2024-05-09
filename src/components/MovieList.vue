<template>
  <div class="movie-list">
    <div v-for="genre in genres" :key="genre.id">
      <h2>{{ genre.name }}</h2>
      <div class="carousel-container">
        <div class="carousel">
          <div v-for="(chunk, index) in chunkedMoviesByGenre(genre.id)" :key="index" class="carousel-slide">
            <div class="film" v-for="movie in chunk" :key="movie.id">
              <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
            </div>
          </div>
        </div>
        <button class="prev" @click="scrollCarousel(-1)">&#10094;</button>
        <button class="next" @click="scrollCarousel(1)">&#10095;</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
      genres: []
    };
  },
  methods: {
    async fetchGenres() {
      const apiKey = '9d613a549275367434c92bddbd15e9ae';
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`;

      try {
        const response = await axios.get(url);
        this.genres = response.data.genres;
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
      }
    },
    async fetchMoviesByGenre(genreId) {
      const apiKey = '9d613a549275367434c92bddbd15e9ae';
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&with_genres=${genreId}&page=1&include_adult=false`;

      try {
        const response = await axios.get(url);
        return response.data.results;
      } catch (error) {
        console.error(`Erro ao buscar filmes do gênero ${genreId}:`, error);
        return [];
      }
    },
    async fetchMovies() {
      try {
        const moviesPromises = this.genres.map(genre => this.fetchMoviesByGenre(genre.id));
        const moviesArrays = await Promise.all(moviesPromises);
        this.movies = moviesArrays.flat();
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    },
    chunkedMoviesByGenre(genreId) {
      const filteredMovies = this.movies.filter(movie => movie.genre_ids.includes(genreId));
      const chunkSize = 5;
      const chunks = [];
      for (let i = 0; i < filteredMovies.length; i += chunkSize) {
        chunks.push(filteredMovies.slice(i, i + chunkSize));
      }
      return chunks;
    },
    scrollCarousel(direction) {
      const carousel = document.querySelector('.carousel');
      if (carousel) {
        const scrollAmount = direction * (carousel.offsetWidth / 2);
        carousel.scrollLeft += scrollAmount;
      }
    }
  },
  async mounted() {
    await this.fetchGenres();
    await this.fetchMovies();
  }
};
</script>

<style scoped>
.movie-list {
  padding: 20px;
}

.carousel-container {
  position: relative;
  overflow: hidden;
}

.carousel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 0px;
}

.carousel-slide {
  flex: 0 0 auto;
  display: flex;
}

.film {
  width: 200px;
}

.film img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 24px;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

@media (max-width: 600px) {
  .carousel {
    flex-wrap: nowrap;
  }
}
</style>
