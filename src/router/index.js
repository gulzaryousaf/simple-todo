import { createRouter, createWebHistory } from 'vue-router'
import {ifAuthenticated} from '../../middleware/authentication'

const routes = [
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import( /* webpackChunkName: "404" */ '../views/404.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "Login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( /* webpackChunkName: "Register" */ '../views/Register.vue'),
  },
  {
    path: '/',
    name: 'Welcome',
    component: () => import( /* webpackChunkName: "Welcome" */ '../views/Welcome.vue'),
  },
  {
    path: '/todo/:id',
    name: 'Todo',
    component: () => import( /* webpackChunkName: "Todo" */ '../views/Todo.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/addtodo',
    name: 'Addtodo',
    component: () => import( /* webpackChunkName: "Addtodo" */ '../views/Addtodo.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import( /* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    meta: {requiresAuth: true}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  ifAuthenticated(to, from, next)  
})

export default router
