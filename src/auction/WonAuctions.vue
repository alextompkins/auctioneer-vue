<template>
  <b-container>
    <h1>My Won Auctions</h1>

    <!-- Filter Controls -->
    <b-alert variant="danger" show
             v-if="errorFlag">
      <strong>An error occurred:</strong>
      <br>{{ error }}
    </b-alert>

    <!-- Auctions List -->
    <ul class="list-unstyled">
      <auction-media-item
        v-for="auction in auctions"
        :auction="auction"
        :key="auction.id">
      </auction-media-item>
    </ul>

  </b-container>
</template>

<script>
  import AuctionMediaItem from "./AuctionMediaItem";

  export default {
    components: {AuctionMediaItem},
    name: "won-auctions",
    props: ['session'],

    data() {
      return {
        error: "",
        errorFlag: false,
        auctions: []
      }
    },

    methods: {
      getAuctions: function () {
        this.$http.get(this.$apiUrl + '/my_won_auctions', {headers: {'X-Authorization': this.session.token}})
          .then(function (response) {
            this.auctions = response.data;
          })
          .then(function () {
            this.errorFlag = false;
            this.error = "";
          })
          .catch(function (error) {
            this.errorFlag = true;
            if (error.status === 0) {
              this.error = "The web server could not be reached.";
            } else if (error.status === 401) {
              this.error = "You are not logged in, therefore you cannot see your won auctions.";
            } else {
              this.error = "A miscellaneous error occurred when retrieving auctions.";
            }
          });
      }
    },

    watch: {
      'session.loggedIn': function (newVal, oldVal) {
        if (newVal === false) {
          this.$router.push({ name: 'home' });
        }
      },
      'session.user': function (newVal, oldVal) {
        if (newVal) {
          this.getAuctions();
        }
      }
    },

    mounted: function () {
      this.getAuctions();
    },

  }
</script>
