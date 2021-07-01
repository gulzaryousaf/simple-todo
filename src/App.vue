<template>
  <div v-if="isLogged">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
  
  <div v-else>
    <div><input type="text" v-bind:value="cred.email" name="email" @input="updateUserData" /></div>
    <div><input type="text" v-bind:value="cred.password" name="password" @input="updateUserData" /></div>
    <button @click="loginUser">Login</button>
  </div>
</template>
<script>
import {validationMixin} from 'vuelidate'
import {mapActions, mapState} from "vuex";
import store from '../store'

 export default {
    name: 'app',
    store,
    mixins: [validationMixin],
    data() {
      return {
        
      }
    },
    computed: {
      ...mapState([
          'isLogged',
          'cred'
        ]),
    },
    beforeMount() {
      this.$store.dispatch('checkUser', localStorage.getItem('user'))
    },
    methods: {
    ...mapActions([
      'login',
      'checkUser'
      ]),

      updateUserData(e){
        this.$store.commit('updateUserCred', `{"name":"${e.target.name}", "value":"${e.target.value}"}`)
      },

      loginUser(){
        this.$store.dispatch('login', {...this.cred})
      }
    }
  }
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
