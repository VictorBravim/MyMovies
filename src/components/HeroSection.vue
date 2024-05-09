<template>
  <div class="hero">
    <div class="film-carousel" v-if="filmes.length > 0">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div class="film-poster" v-for="filme in filmes" :key="filme.id">
          <div class="film-details">
            <h2>{{ filme.title }}</h2>
            <p>{{ filme.overview }}</p>
            <div class="extra-info">
              <p><strong>Gêneros:</strong> {{ getGenres(filme) }}</p>
              <p><strong>Nota:</strong> {{ filme.vote_average }}</p>
            </div>
          </div>
          <img :src="'https://image.tmdb.org/t/p/original' + filme.backdrop_path" :alt="filme.title" />
        </div>
      </div>
      <button class="carousel-control prev" @click="prevFilm">&#10094;</button>
      <button class="carousel-control next" @click="nextFilm">&#10095;</button>
    </div>
    <div v-else class="loading-message">Carregando filmes...</div>
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
        this.filmes = response.data.results.slice(0, 5);
        this.loading = false;
      } catch (error) {
        console.error('Erro ao buscar filmes populares:', error);
        this.loading = false;
      }
    },
    prevFilm() {
      this.currentIndex = (this.currentIndex - 1 + this.filmes.length) % this.filmes.length;
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
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.5em;
}


.film-details {
  position: absolute;
  text-align: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  max-width: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.carousel-control {
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

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
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
