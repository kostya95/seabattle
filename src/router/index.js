import Vue from 'vue'
import VueRouter from 'vue-router'
import Game from '../views/Game'
import EndGame from '../views/EndGame'
import Welcome from '../views/Welcome'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Welcome
  },
  {
    path: '/game',
    component: Game
  },
  {
    path: '/end',
    name: 'End',
    component: EndGame,
    props: true
  }
]

const router = new VueRouter({

  base: process.env.BASE_URL,
  routes
})

export default router
