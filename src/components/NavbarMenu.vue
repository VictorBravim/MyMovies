<template>
  <nav class="fixed-nav">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo">
    </div>
    <ul>
      <li><a href="#">Início</a></li>
      <li><a href="#">Filmes</a></li>
      <li><a href="#">Buscar</a></li>
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
  display: flex;
  justify-content: space-around;
  padding-top: 30px;
  align-items: center;
  z-index: 1000;
}

.logo img {
  height: 30px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

li {
  margin-right: 10px;
}

a {
  color: white;
  text-decoration: none;
}
</style>