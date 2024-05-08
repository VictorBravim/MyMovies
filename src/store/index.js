import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    favorites: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    logout(state) {
      state.user = null
    },
    addToFavorites(state, movie) {
      state.favorites.push(movie)
    },
    removeFromFavorites(state, movieId) {
      state.favorites = state.favorites.filter(movie => movie.id !== movieId)
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        // Simular uma autenticação (substituir por uma chamada real para o backend)
        if (username === 'user' && password === 'password') {
          const user = { username }
          commit('setUser', user)
        } else {
          throw new Error('Credenciais inválidas')
        }
      } catch (error) {
        throw new Error('Erro ao fazer login')
      }
    },
    logout({ commit }) {
      commit('logout')
    },
    addToFavorites({ commit }, movie) {
      commit('addToFavorites', movie)
    },
    removeFromFavorites({ commit }, movieId) {
      commit('removeFromFavorites', movieId)
    }
  }
})
