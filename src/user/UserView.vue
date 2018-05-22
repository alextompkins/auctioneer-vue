<template>
  <b-container>
    <b-row>
      <b-col md="4">
        <h4>View Profile</h4>

        <b-alert variant="danger" v-if="error" show>
          <strong>Error:</strong>
          <p>{{ error }}</p>
        </b-alert>

        <b-form @submit="commitEdit" v-if="user">
          <h2>{{ user.username }}</h2>

          <h5 class="mt-3">Personal Details</h5>

          <template v-if="editing">
            <b-form-group label="Enter given name">
              <b-form-input v-model="givenNameInput"
                            type="text"
                            placeholder="Given Name"
                            required>
              </b-form-input>
            </b-form-group>

            <b-form-group label="Enter family name">
              <b-form-input v-model="familyNameInput"
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

          <div v-if="userIsSelf">
            <h5 class="mt-3">Your Hidden Details</h5>

            Email: {{ user.email }}
            <br>Account Balance: {{ formattedAccountBalance }}
          </div>

          <template v-if="userIsSelf">
            <div class="mt-3" v-if="editing">
              <b-button variant="success" type="submit">Save Changes</b-button>
              <b-button v-on:click="cancelEdit">Cancel</b-button>
              <loading-spinner class="float-right" :loading="loading" />
            </div>

            <div class="mt-3" v-else>
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
        givenNameInput: "",
        familyNameInput: "",
        editing: false,
        loading: false,
        error: ""
      }
    },

    computed: {
      userIsSelf: function () {
        return parseInt(this.$route.params.id) === parseInt(this.session.user.id);
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
            this.givenNameInput = this.user.givenName;
            this.familyNameInput = this.user.familyName;
            this.error = "";
          })
          .catch(function (error) {
            this.user = null;
            if (error.status === 0) {
              this.error = "The web server could not be reached.";
            } else if (error.status === 401) {
              this.error = "You cannot view user profiles because you are not logged in.";
            } else if (error.status === 404) {
              this.error = "No user with that ID exists.";
            }
          });
      },
      cancelEdit: function () {
        this.givenNameInput = this.user.givenName;
        this.familyNameInput = this.user.familyName;
        this.editing = false;
      },
      commitEdit: function (event) {
        event.preventDefault();
        this.loading = true;

        let updateData = {};
        if (this.givenNameInput !== this.user.givenName) {
          updateData.givenName = this.givenNameInput;
        }
        if (this.familyNameInput !== this.user.familyName) {
          updateData.familyName = this.familyNameInput;
        }

        this.$http.patch(this.$apiUrl + '/users/' + this.$route.params.id, updateData,
          { headers: {'X-Authorization': this.session.token} })
          .then(function () {
            this.user.givenName = this.givenNameInput;
            this.user.familyName = this.familyNameInput;

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

    watch: {
      'session.loggedIn': function () {
        this.getUser();
      }
    },

    mounted: function () {
      this.getUser();
    }

  }
</script>

<style scoped>

</style>
