<template>
    <div class="mx-auto bg-gray-200 w-full p-8 mt-20 rounded-lg shadow-lg" style="max-width: 500px">
        <div class="text-center text-2xl font-semibold">Login</div>
        <div class="mt-5 w-full"><input class="w-full p-3 rounded-md border border-gray-400" type="text" placeholder="Email" :value="cred.email" name="email" @input="seteUserData" /></div>
        <div class="mt-3 w-full"><input class="w-full p-3 rounded-md border border-gray-400" type="password" placeholder="Password" :value="cred.password" name="password" @input="seteUserData" /></div>
        <div class="mt-5 w-full text-center"><button class="px-4 rounded-sm py-2 bg-blue-200 hover:bg-blue-300" @click="loginUser">Login</button></div>
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
            this.$toast.info("You are already logged in, please logout to access this page")
            this.$router.push('/dashboard')
            }else{
            this.$router.push('/login')
            }
        })
    },
    methods: {
      seteUserData(e){
        store.commit('setUserCred', `{"name":"${e.target.name}", "value":"${e.target.value}"}`)
      },

      loginUser(){
        store.dispatch('login', {...this.cred}).then(response => {
            this.$toast.success(response)
            this.$router.push('/dashboard')
        }).catch((err)=>{
            this.$toast.error(err)
        })
      }
    }
  }
</script>