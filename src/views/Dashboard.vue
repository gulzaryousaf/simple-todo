<template>
  <div class="home">
    <img alt="Vue logo" @click="userLogout" src="../assets/logo.png">
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  methods: {
    userLogout(){
      this.$store.dispatch('logout').then(response => {
        this.$toast.show(response)
        this.$router.push('/')
      })
    }
  },
  components: {
  }
}
</script>
