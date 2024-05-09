<template>
  <nav class="fixed-nav">
    <div class="logo">
      <img src="caminho_para_o_logo.png" alt="Logo">
    </div>
    <ul>
      <li><a href="#">Início</a></li>
      <li><a href="#">Filmes Populares</a></li>
      <li><a href="#">Buscar Filmes</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavbarMenu'
};
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

.logo img {
  height: 30px; /* Ajuste a altura conforme necessário */
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
}

li {
  margin-right: 10px;
}

a {
  color: white;
  text-decoration: none;
}
</style>
