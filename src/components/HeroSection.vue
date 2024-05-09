<template>
  <div class="hero">
    <h1>{{ titulo }}</h1>
    <p>{{ descricao }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titulo: 'Bem-vindo ao Site de Filmes!',
      descricao: 'Explore uma vasta coleção de filmes populares.'
    };
  }
};
</script>

<style scoped>
/* Estilos específicos do componente HeroSection */
.hero {
  padding: 50px;
  text-align: center;
  color: #fff;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  color: #fff;
}
</style>
