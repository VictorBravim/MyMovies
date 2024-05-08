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
    addFavorite(state, movie) {
      state.favorites.push(movie)
    },
    removeFavorite(state, movieId) {
      state.favorites = state.favorites.filter(movie => movie.id !== movieId)
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('setUser', null)
    },
    addToFavorites({ commit }, movie) {
      commit('addFavorite', movie)
    },
    removeFromFavorites({ commit }, movieId) {
      commit('removeFavorite', movieId)
    }
  }
})
