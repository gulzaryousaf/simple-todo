<template>
    <div class="mx-auto bg-gray-200 w-full p-8 mt-20 rounded-lg shadow-lg" style="max-width: 500px">
        <div class="text-center text-2xl font-semibold">Register</div>
        <div class="mt-5 w-full"><input class="w-full p-3 rounded-md border border-gray-400" type="text" autocomplete="email" placeholder="Email" v-model="email" name="email" /></div>
        <div class="mt-3 w-full"><input class="w-full p-3 rounded-md border border-gray-400" type="password" autocomplete="current-password" placeholder="Password" v-model="password" name="password" /></div>
        <div class="mt-5 w-full text-center"><button class="px-4 rounded-sm py-2 bg-blue-200 hover:bg-blue-300" @click="registerUser">Submit</button></div>

        <div class="text-center mt-7">Already registered? <router-link class="text-blue-500" to="/login">Login here</router-link></div>
    </div>
</template>
<script>
import { mapState} from "vuex";

 export default {
    name: 'register',

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