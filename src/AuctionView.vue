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
          <b-list-group-item v-if="cannotBidReason">
            <h5>Cannot bid</h5>
            {{ cannotBidReason }}
          </b-list-group-item>
          <new-bid-box :session="session"
                       :auctionId="$route.params.id"
                       :minNextBid="minNextBid"
                       :bids="auction.bids"
                       v-else/>
          <bid-list-item
            v-for="bid in bidsSortedByMostRecent"
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
  import NewBidBox from "./NewBidBox";

  export default {
    components: {
      NewBidBox,
      BidListItem
    },
    name: "auction-view",
    props: ['session'],

    data() {
      return {
        auction: {}
      }
    },

    computed: {
      minNextBid: function () {
        return Math.max(this.auction.startingBid, this.auction.currentBid + 1);
      },
      cannotBidReason: function () {
        if (this.session.loggedIn === false) {
          return "You must login to be able to bid.";
        } else if (this.auction.seller.id === this.session.user.id) {
          return "You cannot bid on your own auction.";
        } else if (Date.now() < this.auction.startDateTime) {
          return "Bidding on this auction has not yet begun.";
        } else if (Date.now() >= this.auction.endDateTime) {
          return "This auction has ended.";
        } else {
          return "";
        }
      },
      bidsSortedByMostRecent: function () {
        return this.auction.bids.sort((b1, b2) => b1.datetime < b2.datetime);
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
