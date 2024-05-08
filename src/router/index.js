import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Movie from '../views/Movie.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/movie/:id', component: Movie },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router