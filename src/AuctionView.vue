<template>
  <b-container>
    <h1>View Auction</h1>
    <h3>{{ auction.title }}</h3>
    <p>
      <b-img></b-img>

      <template v-if="auction.seller">Seller: {{ auction.seller.username }}</template>

      <br>
      <template v-if="auction.startDate < Date.now()">
        Started on {{ auction.startDate.toLocaleString("en-NZ") }}.
      </template>
      <template v-else>
        Starts on {{ auction.startDate.toLocaleString("en-NZ") }}.
      </template>

      <br>
      <template v-if="auction.endDate < Date.now()">
        Ended on {{ auction.endDate.toLocaleString("en-NZ") }}.
      </template>
      <template v-else>
        Ends on {{ auction.endDate.toLocaleString("en-NZ") }}.
      </template>

    </p>

  </b-container>
</template>

<script>
  export default {
    name: "auction-view",

    data() {
      return {
        auction: {}
      }
    },

    mounted: function () {
      this.getAuction();
    },

    methods: {
      getAuction: function () {
        this.$http.get(this.$apiUrl + '/auctions/' + this.$route.params.id)
          .then(function (response) {
            let auction = response.data;
            auction.startDate = new Date(auction.startDateTime);
            auction.endDate = new Date(auction.endDateTime);
            return auction;
          })
          .then(function (auction) {
            this.auction = auction;
          })
          .catch(function (error) {
            // TODO deal with error
          });
      }
    }

  }
</script>

<style scoped>

</style>
