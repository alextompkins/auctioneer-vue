<template>
  <b-container>
    <b-row>
      <b-col md="4">
        <h1 class="mb-4 mt-1">Register</h1>

        <b-alert class="mt-3" variant="danger" v-if="error" show>
          {{ error }}
        </b-alert>

        <b-form @submit="onSubmit">
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

          <b-button type="submit" variant="primary">Register</b-button>

          <loading-spinner class="float-right" :loading="loading" />
        </b-form>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import LoadingSpinner from "./LoadingSpinner";

  export default {
    components: {LoadingSpinner},
    name: "register",
    props: ['session'],

    data() {
      return {
        username: "",
        givenName: "",
        familyName: "",
        email: "",
        password: "",
        confirm: "",
        error: "",
        loading: false
      }
    },

    computed: {
      passwordsMatch: function () {
        if (this.password === "") {
          return null;
        } else {
          return this.password === this.confirm;
        }
      }
    },

    methods: {
      onSubmit: function (event) {
        event.preventDefault();

        if (this.passwordsMatch) {
          this.registerNewUser();
        }
      },
      registerNewUser: function () {
        this.loading = true;
        let createData = {
          "username": this.username,
          "givenName": this.givenName,
          "familyName": this.familyName,
          "email": this.email,
          "password": this.password
        };

        this.$http.post(this.$apiUrl + '/users', createData)
          .then(function () {
            let loginData = {
              "username": createData.username,
              "password": createData.password
            };
            return this.$http.post(this.$apiUrl + '/users/login', loginData);
          })
          .then(function (response) {
            this.session.loggedIn = true;
            this.session.user = {
              "id": response.data.id,
              "username": createData.username,
              "email": createData.email,
              "password": createData.password
            };
            this.session.token = response.data.token;
            this.loading = false;
            this.$router.push({ name: 'home' });
          })
          .catch(function (error) {
            if (error.status === 400) {
              this.error = "That username/email is already in use.";
            } else {
              this.error = "A server error occurred when attempting to register.";
            }
            this.loading = false;
          });
      }
    }

  }
</script>

<style scoped>

</style>
