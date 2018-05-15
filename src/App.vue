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
      </b-collapse>

    </b-navbar>

    <!-- Page content -->
    <router-view></router-view>

  </div>
</template>
