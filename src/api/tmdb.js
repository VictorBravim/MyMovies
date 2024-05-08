import axios from 'axios'

const apiKey = 'SUA_API_KEY_DO_TMDB'

export default {
  async searchMovies(query) {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: apiKey,
          query
        }
      })
      return response.data.results
    } catch (error) {
      throw new Error('Erro ao buscar filmes')
    }
  },
  async getMovieDetails(movieId) {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: apiKey
        }
      })
      return response.data
    } catch (error) {
      throw new Error('Erro ao obter detalhes do filme')
    }
  }
}