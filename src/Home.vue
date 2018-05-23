<template>
  <b-container>
    <h1>Home</h1>
    <p>
      Welcome to <strong>Auctioneer</strong>.
      <br>Here's a run-down of this app's functionality:
    </p>

    <h3>Buying</h3>
    <p>
      Use the 'buying' dropdown menu above to go to the search auctions page, and browse auctions based on your search criteria.
      <template v-if="session.loggedIn"><br>Or view auctions that you've won on the "my won auctions" page.</template>
    </p>

    <template v-if="session.loggedIn">
      <h3>Selling</h3>
      <p>
        Use the 'selling' dropdown menu above to post a new auction, or view auctions you've previously created.
      </p>
    </template>

    <template v-if="session.loggedIn">
      <h3>Logged In</h3>
      <p>Since you are logged in, you have access to a wider range of functionality, including:</p>
    </template>
    <template v-else>
      <h3>Login</h3>
      <p>Login or register as a user to unlock more functionality, including:</p>
    </template>
    <ul>
      <li>Viewing your profile page.</li>
      <li>Viewing other users' profiles.</li>
      <li>Creating an auction.</li>
      <li>Editing auctions you've made.</li>
      <li>Bidding on other users' auctions.</li>
      <li>and more...</li>
    </ul>
  </b-container>
</template>

<script>
  export default {
    name: "home",
    props: ['session']
  }
</script>
