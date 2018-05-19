<template>
  <b-container>
    <h4>View Auction</h4>

    <b-row>
      <b-col xs="12" md="7">
        <h2>{{ auction.title }}</h2>

        <b-card class="mb-3" id="preview">
          <b-img :src="this.$apiUrl + '/auctions/' + $route.params.id + '/photos'"></b-img>
        </b-card>

        <h4>Details</h4>

        <p>
          {{ auction.description }}
          <br>Seller: {{ auction.seller.username }}

          <br>{{ startDateString }}
          <br>{{ endDateString }}
        </p>

      </b-col>

      <b-col xs="12" md="1"></b-col>

      <b-col xs="12" md="4">
        <h4>Bids</h4>
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
      </b-col>

    </b-row>

  </b-container>
</template>

<script>
  import AuctionStatusBox from "./AuctionStatusBox";
  import BidListItem from "./BidListItem";
  import NewBidBox from "./NewBidBox";
  import {formatDateTimeAbsolute} from "./helpers";

  export default {
    components: {
      AuctionStatusBox,
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
      startDateString: function () {
        let dateTimeString = formatDateTimeAbsolute(this.auction.startDateTime);
        if (Date.now() < this.auction.startDateTime) {
          return "Will begin " + dateTimeString;
        } else {
          return "Began " + dateTimeString;
        }
      },
      endDateString: function () {
        let dateTimeString = formatDateTimeAbsolute(this.auction.endDateTime);
        if (Date.now() < this.auction.endDateTime) {
          return "Will end " + dateTimeString;
        } else {
          return "Ended " + dateTimeString;
        }
      },
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
            this.auction = response.data;
          })
          .catch(function (error) {
            // TODO deal with error
          });
      }
    }

  }
</script>

<style scoped>
  .card-body {
    width: 100%;
  }

  #preview {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #preview img {
    max-width: 100%;
    max-height: 30rem;
    display:block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
