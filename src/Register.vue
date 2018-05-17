<template>
  <b-container>
    <b-row>
      <b-col md="4">
        <h1 class="mb-4 mt-1">Register</h1>

        <b-form-group label="Your username">
          <b-form-input placeholder="Username"
                        v-model="username"
                        type="text"
                        required>
          </b-form-input>
        </b-form-group>

        <b-form-group label="Your given name">
          <b-form-input placeholder="Given Name"
                        v-model="givenName"
                        type="text"
                        required>
          </b-form-input>
        </b-form-group>

        <b-form-group label="Your family name">
          <b-form-input placeholder="Family Name"
                        v-model="familyName"
                        type="text"
                        required>
          </b-form-input>
        </b-form-group>

        <b-form-group label="Your email address">
          <b-form-input placeholder="Email"
                        v-model="email"
                        type="email"
                        required>
          </b-form-input>
        </b-form-group>

        <b-form-group label="Your password">
          <b-form-input placeholder="Password"
                        v-model="password"
                        type="password"
                        required>
          </b-form-input>
        </b-form-group>

        <b-form-group label="Please confirm your password">
          <b-form-input placeholder="Confirm Password"
                        v-model="confirm"
                        type="password"
                        :state="passwordsMatch">
          </b-form-input>
          <template slot="invalid-feedback">Passwords do not match.</template>
        </b-form-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: "register.vue",
    props: ['session'],

    data() {
      return {
        username: "",
        givenName: "",
        familyName: "",
        email: "",
        password: "",
        confirm: ""
      }
    },

    computed: {
      passwordsMatch: function () {
        if (this.confirm === "") {
          return null;
        } else {
          return this.password === this.confirm;
        }
      }
    }

  }
</script>

<style scoped>

</style>
