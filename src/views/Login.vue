<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        // Realizar autenticação (por exemplo, enviar dados para o backend e verificar)
        const user = {
          username: this.username,
          // Password deve ser criptografada antes de enviar para o backend
          // Exemplo de chamada Vuex para realizar login
          // this.$store.dispatch('login', user)
        }
        console.log('Logged in as:', user)
      }
    }
  }
  </script>
  