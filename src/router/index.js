import { createRouter, createWebHistory } from 'vue-router'
import store from '../../store'

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
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "About" */ '../views/About.vue'),
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
  if(to.matched.some(rt => rt.meta.requiresAuth)){
    if(!store.state.isAuthenticated){
      store.dispatch('checkAuth', localStorage.getItem('user')).then(response => {
        if(response){
          next();
        }else{
          next({
            name: 'Login'
          });
        }
      })
    }else{
      next();
    }
  }else{
    next();
  }
})

export default router
