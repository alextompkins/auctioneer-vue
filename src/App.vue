<template>
  <div id="app">
    <!-- Navbar -->
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand :to="{ name: 'home' }">Auctioneer</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item-dropdown text="Buying">
            <b-dropdown-item :to="{ name: 'search-auctions' }">Search Auctions</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'won-auctions' }" v-if="this.session.loggedIn">My Won Auctions</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Selling" v-if="session.loggedIn">
            <b-dropdown-item :to="{ name: 'post-auction' }">Post Auction</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'my-auctions' }">My Auctions</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="session.user.username" right v-if="session.loggedIn">
            <b-dropdown-item :to="{ name: 'user-view', params: { id: session.user.id } }">My Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Login" right v-else>
            <li class="px-3 py-2" style="width: 20rem">
              <login-box :session="session" />
            </li>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>

    </b-navbar>

    <!-- Page content -->
    <router-view :session="session" class="mt-3"/>

  </div>
</template>

<script>
  import LoginBox from "./user/LoginBox";

  export default {
    components: {LoginBox},
    name: "app",

    data() {
      return {
        session: {
          "loggedIn": false,
          "token": "",
          "user": null
        }
      }
    },

    watch: {
      'session.user': {
        handler: function (newVal, oldVal) {
          if (newVal) {
            this.$cookie.set('auth-id', newVal.id);
          } else {
            this.$cookie.delete('auth-id');
          }
        },
        deep: true
      },
      'session.token': function (newVal, oldVal) {
        if (newVal) {
          this.$cookie.set('auth-token', newVal);
        } else {
          this.$cookie.delete('auth-token');
        }
      }
    },

    methods: {
      logout: function () {
        this.$http.post(this.$apiUrl + '/users/logout', {}, {
          'headers': {'X-Authorization': this.session.token}
        })
          .then(function () {
            this.session.loggedIn = false;
            this.session.user = null;
            this.session.token = "";
          })
          .catch(function () {
            // TODO do something if error
          });
      },
      loadUserFromIdAndToken: function (id, token) {
        this.$http.get(this.$apiUrl + '/users/' + id, { headers: {'X-Authorization': token} })
          .then(function (response) {
            this.session.loggedIn = true;
            this.session.user = {
              'id': id,
              'username': response.data.username,
              'email': response.data.email
            };
            this.session.token = token;
          })
          .catch(function (error) {
            // TODO do something clever
          });
      }
    },

    created: function () {
      let authId = this.$cookie.get('auth-id');
      let authToken = this.$cookie.get('auth-token');

      if (authId && authToken) {
        this.loadUserFromIdAndToken(authId, authToken);
      }
    }

  }
</script>

<style scoped>

</style>
