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
    async login() {
      try {
        // Chamar uma action do Vuex para realizar o login
        await this.$store.dispatch('login', { username: this.username, password: this.password })
        // Redirecionar para a página inicial ou outra rota protegida
        this.$router.push('/')
      } catch (error) {
        console.error('Erro ao fazer login:', error.message)
      }
    }
  }
}
</script>
