<template>
  <div class="movie-list">
    <div v-for="genre in genres" :key="genre.id">
      <h2>{{ genre.name }}</h2>
      <div class="carousel-container">
        <div class="carousel" :id="'carousel-' + genre.id">
          <div v-for="(chunk, index) in chunkedMoviesByGenre(genre.id)" :key="index" class="carousel-slide">
            <div v-for="movie in chunk" :key="movie.id" class="film film-hover" @mouseover="showMovieTitle(movie)"
              @mouseleave="hideMovieTitle(movie)">
              <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
              <transition name="scale-up">
                <p v-if="movie.showTitle" class="movie-title">{{ movie.title }}</p>
              </transition>
            </div>
          </div>
        </div>
        <button class="prev" @click="scrollCarousel(-1, genre.id)">&#10094;</button>
        <button class="next" @click="scrollCarousel(1, genre.id)">&#10095;</button>
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
        const moviesSets = await Promise.all(this.genres.map(genre => this.fetchMoviesByGenre(genre.id)));

        const uniqueMovies = new Set();
        moviesSets.forEach(movies => {
          movies.forEach(movie => {
            uniqueMovies.add(JSON.stringify(movie));
          });
        });

        this.movies = Array.from(uniqueMovies).map(movie => JSON.parse(movie));
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    },
    chunkedMoviesByGenre(genreId) {
      const filteredMovies = this.movies.filter(movie => movie.genre_ids.includes(genreId));
      const chunkSize = 5;
      const chunks = [];

      for (let i = 0; i < filteredMovies.length; i += chunkSize) {
        const chunk = filteredMovies.slice(i, i + chunkSize);
        chunk.forEach(movie => {
          movie.showTitle = false;
        });
        chunks.push(chunk);
      }

      return chunks;
    },
    showMovieTitle(movie) {
    movie.showTitle = true;
  },
  hideMovieTitle(movie) {
    movie.showTitle = false;
  },
    scrollCarousel(direction, genreId) {
      const carousel = document.getElementById(`carousel-${genreId}`);
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
  width: 250px;
  padding: 5px;
}

.film img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
}

.scale-up-enter-active,
.scale-up-leave-active {
  transition: transform 0.3s ease;
}

.scale-up-enter,
.scale-up-leave-to {
  transform: scale(1);
}

.scale-up-enter-to,
.scale-up-leave {
  transform: scale(1);
}

.movie-title {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 14px;
  text-align: center;
  padding: 15px;
  margin: 5px 5px 0px 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 5px;
}

.film-hover {
  position: relative;
  overflow: hidden;
}

.film-hover:hover .movie-title {
  opacity: 1;
}

.prev,
.next {
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
