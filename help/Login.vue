<template>
  <div class="d-flex min-vh-100 align-items-center justify-content-center">
    <form @submit.prevent="submit" class="py-4 px-3 border shadow-sm rounded">
      <div class="text-center mb-4">
        <img class="img-fluid" src="/images/logo.svg" alt="">
      </div>
      <b-form-group label="Email">
        <b-input :state="$v.email.$error ? false: null" v-model="$v.email.$model" type="email"
                 size="sm" placeholder="Email"/>
        <template #invalid-feedback>
          <ErrorMessages :field="$v.email" name="email"/>
        </template>
      </b-form-group>
      <b-form-group label="Password">
        <b-input :state="$v.password.$error ? false: null" v-model="$v.password.$model" type="password" size="sm"
                 placeholder="******"/>
        <template #invalid-feedback>
          <ErrorMessages :field="$v.password" name="password"/>
        </template>
      </b-form-group>
      <b-button type="submit" variant="primary" block size="sm" class="shadow-bottom mt-5 text-uppercase">Login
      </b-button>
    </form>
  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import ErrorMessages from "../components/ErrorMessages";
import {loginValidation} from "../validations/loginValidation";
import {mapActions} from "vuex";
import apiService from "../service/apiService";
import {authHeader} from "../helpers/authHeader";

export default {
  name: "Login",
  components: {ErrorMessages},
  mixins: [validationMixin],
  validations: loginValidation,
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const credentials = {
        email: this.email,
        password: this.password
      }
      await this.login(credentials)
      apiService.defaults.headers = authHeader()
      await this.$router.push({name: 'Applications'})
    }
  }
}
</script>

<style scoped lang="scss">
form {
  width: 500px;
  background: white;
}
</style>
