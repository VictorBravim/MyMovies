<template>
  <nav class="fixed-nav">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo">
    </div>
    <ul>
      <li><a href="#">HOME</a></li>
      <li><a href="#">FIMES</a></li>
      <li><a href="#">SERIES</a></li>
      <li><a href="#">ANIMES</a></li>
      <button>
        LOGIN
      </button>
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
  height: 50px;
  margin-right: 380px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center
}

li {
  font-size: 1.4em;
  margin-right: 15px;
}

button {
  padding: 10px;
  border-radius: 5px;
  background-color: #FE0000;
  color: white;
  border: none;
  font-size: 1.4em;
  margin-left: 15px;
  font-weight: 600;
}

button:hover {
  font-size: 1.5em;
}

a {
  color: white;
  text-decoration: none;
}
</style>