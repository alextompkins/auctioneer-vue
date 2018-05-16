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
          <b-nav-item-dropdown text="Login" right>
            <li class="px-3 py-2" style="width: 20rem">
              <login-box/>
            </li>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>

    </b-navbar>

    <!-- Page content -->
    <router-view class="mt-3"/>

  </div>
</template>

<script>
  import LoginBox from "./LoginBox";

  export default {
    components: {LoginBox},
    name: "app",
  }
</script>

<style scoped>

</style>
