<template>
 <vue-snotify></vue-snotify>
    <div class="mx-auto bg-gray-200 w-full p-8 mt-20 rounded-lg shadow-lg" style="max-width: 500px">
        <div class="text-center text-2xl font-semibold">Register</div>
        <div class="mt-5 w-full"><input class="w-full p-3 rounded-md border border-gray-400" type="text" autocomplete="username" placeholder="Email" v-model="email" name="email" /></div>
        <div class="mt-3 w-full"><input class="w-full p-3 rounded-md border border-gray-400" type="password" autocomplete="current-password" placeholder="Password" v-model="password" name="password" /></div>
        <div class="mt-5 w-full text-center"><button class="px-4 rounded-sm py-2 bg-blue-200 hover:bg-blue-300" @click="registerUser">Submit</button></div>
    </div>
</template>
<script>
import { mapState} from "vuex";
import store from '../../store'

 export default {
    name: 'login',
    store,
    data() {
      return {
        email: null,
        password: null
      }
    },
    computed: {
      ...mapState([
          'cred'
        ]),
    },
    beforeCreate(){
        store.dispatch('checkAuth', localStorage.getItem('user')).then(response => {
            if(response){
            this.$toast.info("You are already logged in, please logout to get a new registraion")
            this.$router.push('/dashboard')
            }else{
            this.$router.push('/register')
            }
        })
    },
    methods: {
      registerUser(){
          if(this.email && this.password){
              this.$toast.info("Please check your email inbox to complete registration");
              this.$router.push('/login')
          }else{
              this.$toast.error("Please fill the Email and Password fields to register")
          }
      }
    }
  }
</script>