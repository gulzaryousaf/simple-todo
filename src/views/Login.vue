<template>
    <div class="mx-auto bg-gray-200 w-full p-8 mt-20 rounded-lg shadow-lg" style="max-width: 500px">
        <div class="text-center text-2xl font-semibold">Login</div>
        <div class="mt-5 w-full"><input class="w-full p-3 rounded-md border border-gray-400" type="text" placeholder="Email" :value="cred.email" name="email" @input="seteUserData" /></div>
        <div class="mt-3 w-full"><input class="w-full p-3 rounded-md border border-gray-400" type="password" placeholder="Password" :value="cred.password" name="password" @input="seteUserData" /></div>
        <div class="mt-5 w-full text-center"><button class="px-4 rounded-sm py-2 bg-blue-200 hover:bg-blue-300" @click="loginUser">Login</button></div>

        <div class="text-center mt-7">Don't have an account? <router-link class="text-blue-500" to="/register">Register here</router-link></div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations} from "vuex";

 export default {
    name: 'login',
    data() {
      return {
        
      }
    },
    computed: {
      ...mapState([
          'cred'
        ]),
    },
    methods: {
      ...mapMutations([
        'setUserCred'
        ]),
      ...mapActions([
        'login'
        ]),
      seteUserData(e){
        this.setUserCred(`{"name":"${e.target.name}", "value":"${e.target.value}"}`)
      },

      loginUser(){
        this.login({...this.cred}).then(response => {
            this.$toast.success(response)
            this.$router.push('/dashboard')
        }).catch((err)=>{
            this.$toast.error(err)
        })
      }
    }
  }
</script>