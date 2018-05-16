<template>
  <b-container>
    <h1>View Auction</h1>

    <b-row>
      <b-col xs="12" md="7">
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
      </b-col>

      <b-col xs="12" md="5">
        <h4>Bids</h4>
        <b-list-group>
          <bid-list-item
            v-for="bid in auction.bids"
            :bid="bid"
            :key="bid.datetime">
          </bid-list-item>
        </b-list-group>
      </b-col>

    </b-row>

  </b-container>
</template>

<script>
  import BidListItem from "./BidListItem";

  export default {
    components: {BidListItem},
    name: "auction-view",
    props: ['session'],

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
