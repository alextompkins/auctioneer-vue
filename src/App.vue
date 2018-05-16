<template>
  <div id="app">
    <!-- Navbar -->
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand :to="{ name: 'home' }">Auctioneer</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'auctions' }">Auctions</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="session.user.username" right v-if="session.loggedIn">
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
  import LoginBox from "./LoginBox";

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
      }
    }

  }
</script>

<style scoped>

</style>
