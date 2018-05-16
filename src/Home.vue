<template>
  <b-container>
    <h1>Home</h1>
    <p>Welcome to <strong>Auctioneer</strong>.</p>
    <p>
      You are logged in: {{ session.loggedIn }}
      <br>Logged in as: {{ session.user }}
      <br>Token is: {{ session.token }}
    </p>
  </b-container>
</template>

<script>
  export default {
    name: "home",
    props: ['session']
  }
</script>
