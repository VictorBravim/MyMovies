<template>
  <div class="hero">
    <div class="film-carousel" v-if="filmes.length > 0">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div class="film-poster" v-for="filme in filmes" :key="filme.id">
          <img :src="'https://image.tmdb.org/t/p/original' + filme.backdrop_path" :alt="filme.title" />
        </div>
      </div>
      <button class="carousel-control next" @click="nextFilm">&#10095;</button>
    </div>
    <div v-else class="loading-message">Carregando filmes...</div>

    <div class="film-details" v-if="filmes.length > 0">
      <div class="details">
        <h2>{{ filmes[currentIndex].title }}</h2>
        <p>{{ filmes[currentIndex].overview }}</p>
        <div class="extra-info">
          <p><strong>Gêneros:</strong> <span> {{ getGenres(filmes[currentIndex]) }} </span></p>
          <p><strong>Nota:</strong> <span> {{ filmes[currentIndex].vote_average }} </span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      filmes: [],
      currentIndex: 0,
      loading: true
    };
  },
  mounted() {
    this.fetchFilmesPopulares();
  },
  methods: {
    async fetchFilmesPopulares() {
      const apiKey = '9d613a549275367434c92bddbd15e9ae';
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

      try {
        const response = await axios.get(url);
        const movies = response.data.results.slice(0, 5);

        const filmesCompletos = await Promise.all(
          movies.map(async (movie) => {
            const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=pt-BR`;
            const movieDetailsResponse = await axios.get(movieDetailsUrl);
            return movieDetailsResponse.data;
          })
        );

        this.filmes = filmesCompletos;
        this.loading = false;
      } catch (error) {
        console.error('Erro ao buscar filmes populares:', error);
        this.loading = false;
      }
    },
    nextFilm() {
      this.currentIndex = (this.currentIndex + 1) % this.filmes.length;
    },
    getGenres(filme) {
      if (filme && filme.genres) {
        return filme.genres.map(genre => genre.name).join(', ');
      }
      return 'N/A';
    }
  }
};
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.film-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.3s ease;
}

.film-poster {
  position: relative;
  flex: 0 0 100%;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 24px;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.carousel-control.next {
  display: block;
}

.film-details {
  position: absolute;
  top: 0;
  left: 0;
  width: 48%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
}

.details {
  margin-left: 20%
}

.film-details h2,
.film-details p {
  text-align: left;
  margin-bottom: 10px;
  width: 70%;
}

.film-details h2 {
  font-size: 4.0em;
  color: #FE0000;
}

.film-details p {
  font-size: 1.1em;
  color: #646464;
}

.extra-info {
  text-align: center;
}

.extra-info p {
  color: #FE0000;
}

.extra-info span {
  color: #c5c5c5;
}

.loading-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 18px;
}

.film-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
