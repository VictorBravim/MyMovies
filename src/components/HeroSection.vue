<template>
  <div class="hero">
    <!-- Carrossel de Filmes -->
    <div class="film-carousel" v-if="filmes.length > 0">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div class="film-poster" v-for="filme in filmes" :key="filme.id">
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
        this.filmes = response.data.results.slice(0, 5); // Pegar os primeiros 5 filmes populares
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
    }
  }
};
</script>

<style scoped>
/* Estilos específicos do componente HeroSection */
.hero {
  position: relative;
  width: 100%;
  height: 100vh; /* Define a altura da hero como 100% da viewport */
  overflow: hidden; /* Oculta conteúdo além da hero */
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
  flex: 0 0 100%; /* Cada filme ocupa 100% da largura da tela */
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

/* Ajuste para as imagens no carrossel */
.film-poster img {
  width: 100%; /* Garante que a imagem ocupe toda a largura do contêiner */
  height: 100%; /* Permite que a imagem mantenha sua proporção original */
  object-fit: cover; /* Ajusta a imagem para cobrir o contêiner sem distorção */
}
</style>
