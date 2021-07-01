import store from '../store'

export const ifAuthenticated = (to, from, next) => {
  store.dispatch('login')
      .then(() => {
        next()
      })
      .catch(() => {
        next({ name: 'Login', query: { redirect_to: to.fullPath } })
      })
}