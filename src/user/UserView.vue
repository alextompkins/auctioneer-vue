<template>
  <b-container>
    <b-row>
      <b-col md="4">
        <h4>View Profile</h4>
        <h2>{{ user.username }}</h2>

        <b-alert variant="danger" v-if="error" show>
          <strong>Error:</strong>
          <p>{{ error }}</p>
        </b-alert>

        <h5 class="mt-3">Personal Details</h5>

        <b-form @submit="updateUser">
          <template v-if="editing">
            <b-form-group label="Enter given name">
              <b-form-input v-model="user.givenName"
                            type="text"
                            placeholder="Given Name"
                            required>
              </b-form-input>
            </b-form-group>

            <b-form-group label="Enter family name">
              <b-form-input v-model="user.familyName"
                            type="text"
                            placeholder="Family Name"
                            required>
              </b-form-input>
            </b-form-group>
          </template>

          <template v-else>
            Given Name: {{ user.givenName }}
            <br>Family Name: {{ user.familyName }}
          </template>

          <h5 class="mt-3">Your Hidden Details</h5>

          <div v-if="userIsSelf">
            Email: {{ user.email }}
            <br>Account Balance: {{ formattedAccountBalance }}
          </div>

          <template v-if="userIsSelf">
            <div class="mt-2" v-if="editing">
              <b-button variant="success" type="submit">Save Changes</b-button>
              <b-button v-on:click="editing = false">Cancel</b-button>
              <loading-spinner class="float-right" :loading="loading" />
            </div>

            <div class="mt-2" v-else>
              <b-button variant="success" v-on:click="editing = true">Edit</b-button>
            </div>
          </template>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import {amountAsCurrency} from '../helpers';
  import LoadingSpinner from "../misc/LoadingSpinner";

  export default {
    components: {LoadingSpinner},
    name: "user-view",
    props: ['session'],

    data() {
      return {
        user: null,
        editing: false,
        loading: false,
        error: ""
      }
    },

    computed: {
      userIsSelf: function () {
        return this.$route.params.id === this.session.user.id;
      },
      formattedAccountBalance: function() {
        return amountAsCurrency(this.user.accountBalance);
      }
    },

    methods: {
      getUser: function () {
        this.$http.get(this.$apiUrl + '/users/' + this.$route.params.id,
          { headers: {'X-Authorization': this.session.token} })
          .then(function (response) {
            this.user = response.data;
          })
          .catch(function (error) {
            if (error.status === 0) {
              this.error = "The web server could not be reached.";
            } else if (error.status === 404) {
              this.error = "No user with that ID exists.";
            }
          });
      },
      updateUser: function (event) {
        event.preventDefault();
        this.loading = true;

        const updateData = {
          "givenName": this.user.givenName,
          "familyName": this.user.familyName
        };

        this.$http.patch(this.$apiUrl + '/users/' + this.$route.params.id, updateData,
          { headers: {'X-Authorization': this.session.token} })
          .then(function () {
            this.loading = false;
            this.editing = false;
            this.error = "";
          })
          .catch(function (error) {
            this.loading = false;
            if (error.status === 401) {
              this.error = "You are not authorised to edit this user.";
            } else {
              this.error = "The web server could not be reached.";
            }
          });
      }
    },

    mounted: function () {
      this.getUser();
    }

  }
</script>

<style scoped>

</style>
