import store from '../store'
import vm from '../src/main'

const checkAuth = async () => {
  return await store.dispatch('checkAuth', localStorage.getItem('user')).then(response => response)
}

const checkPath = (to, next) => {
  if(to.path == '/login' || to.path == '/register' || to.path == '/'){
    checkAuth().then(response => {
      if(response){
        vm.$toast.info("You are already logged in, please logout first.")
        next({
          name: 'Dashboard'
        })
      }else{
        next();
      }
    })
  }else{
    next();
  }
}

export const ifAuthenticated = (to, from, next) => {
  if(to.matched.some(rt => rt.meta.requiresAuth)){
    if(!store.state.isAuthenticated){
      checkAuth().then(response => {
        if (response) {
          checkPath(to, next)
        }else{
          next({
            name: 'Login'
          })
        }
      })
    }else{
      checkPath(to, next)
    }
  }else{
    checkPath(to, next)
  }
}