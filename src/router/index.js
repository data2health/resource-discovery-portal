import { createRouter, createWebHistory } from 'vue-router'
import {routes} from './routes.js'

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes,
  linkActiveClass: "route-active",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
})

export default router
