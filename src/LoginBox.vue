<template>
  <b-form @submit="onSubmit">
    <b-link class="float-right btn btn-outline-primary">Register</b-link>
    <h4 class="mb-4 mt-1">Sign in</h4>

    <b-form-group label="Your email"
                  v-if="!useUsernameInstead">
      <b-form-input placeholder="Email"
                    v-model="email"
                    type="email"
                    required>
      </b-form-input>

      <b-link class="float-right" v-on:click="useUsernameInstead = true">use username instead</b-link>
    </b-form-group>

    <b-form-group label="Your username"
                  v-if="useUsernameInstead">
      <b-form-input placeholder="Username"
                    v-model="username"
                    type="text"
                    required>
      </b-form-input>

      <b-link class="float-right" v-on:click="useUsernameInstead = false">use email instead</b-link>
    </b-form-group>

    <b-form-group label="Your password">
      <b-form-input placeholder="******"
                    v-model="password"
                    type="password"
                    required>
      </b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Login</b-button>

  </b-form>
</template>

<script>
  export default {
    name: "login-box",

    data() {
      return {
        useUsernameInstead: false,
        email: "",
        username: "",
        password: "",
      }
    },

    methods: {
      onSubmit: function (event) {
        event.preventDefault();
        // TODO write login logic
      }
    }
  }
</script>

<style scoped>

</style>
