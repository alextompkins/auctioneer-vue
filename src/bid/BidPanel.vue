<template>
  <b-list-group>
    <auction-status-box :auction="auction"/>
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
</template>

<script>
  import AuctionStatusBox from "../auction/AuctionStatusBox";
  import BidListItem from "./BidListItem";
  import NewBidBox from "./NewBidBox";

  export default {
    components: {
      AuctionStatusBox,
      NewBidBox,
      BidListItem
    },
    name: "bid-panel",
    props: ['session', 'auction'],

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
    }
  }
</script>

<style scoped>

</style>
