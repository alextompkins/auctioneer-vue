<template>
  <b-form @submit="onSubmit">
    <b-link class="float-right btn btn-outline-primary">Register</b-link>
    <h4 class="mb-4 mt-1">Sign in</h4>

    <b-form-group label="Your username"
                  v-if="useUsernameInstead">
      <b-form-input placeholder="Username"
                    v-model="username"
                    type="text"
                    required>
      </b-form-input>

      <b-button variant="link" class="float-right" tabindex="2" v-on:click="useUsernameInstead = false">
        use email instead
      </b-button>
    </b-form-group>

    <b-form-group label="Your email"
                  v-else>
      <b-form-input placeholder="Email"
                    v-model="email"
                    type="email"
                    required>
      </b-form-input>

      <b-button variant="link" class="float-right" tabindex="2" v-on:click="useUsernameInstead = true">
        use username instead
      </b-button>
    </b-form-group>

    <b-form-group label="Your password">
      <b-form-input placeholder="******"
                    v-model="password"
                    type="password"
                    required>
      </b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Sign in</b-button>

    <b-alert class="mt-3" variant="danger" v-if="error" show>
      {{ error }}
    </b-alert>

  </b-form>
</template>

<script>
  export default {
    name: "login-box",
    props: ['session'],

    data() {
      return {
        useUsernameInstead: true,
        email: "",
        username: "",
        password: "",
        error: ""
      }
    },

    methods: {
      onSubmit: function (event) {
        event.preventDefault();

        let loginData = {
          "password": this.password
        };
        if (this.useUsernameInstead) {
          loginData["username"] = this.username;
        } else {
          loginData["email"] = this.email;
        }

        this.$http.post(this.$apiUrl + '/users/login', loginData)
          .then(function (response) {
            this.error = "";
            this.session.loggedIn = true;
            this.session.user = {
              "id": response.data.id,
            };
            this.session.token = response.data.token;

            return this.$http.get(this.$apiUrl + '/users/' + response.data.id,
              { headers: {'X-Authorization': this.session.token} });
          })
          .then(function (response) {
            this.session.user = {
              "id": this.session.user.id,
              "username": response.data.username,
              "email": response.data.email
            };
          })
          .catch(function (error) {
            if (error.status === 400) {
              this.error = "Incorrect credentials.";
            } else {
              this.error = "A server error occurred when attempting to login.";
            }
          });

      }
    }
  }
</script>

<style scoped>

</style>
