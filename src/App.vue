<template>
  <div id="app">
    <!-- Barra de Navegação -->
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/favorites">Favorites</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>

    <!-- Conteúdo Principal -->
    <main>
      <router-view></router-view>
    </main>

    <!-- Rodapé -->
    <footer>
      <p>&copy; 2024 Meu Site de Filmes</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

nav {
  background-color: #333;
  color: #fff;
  padding: 1rem;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
}

nav ul li {
  margin-right: 1rem;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
}

main {
  flex-grow: 1;
  padding: 1rem;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 1rem;
}
</style>
