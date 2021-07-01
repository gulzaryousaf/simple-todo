<template>
  <div class="home">
    <img alt="Vue logo" @click="logout" src="../assets/logo.png">
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'Home',
  methods: {
    ...mapActions([
      'logout'
    ])
  },
  components: {
  }
}
</script>
