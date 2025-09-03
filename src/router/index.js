import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Details from '../pages/Details.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/pokemon/:name', name: 'Details', component: Details, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

export default router
