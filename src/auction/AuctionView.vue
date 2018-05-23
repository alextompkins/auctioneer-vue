<template>
  <b-container>
    <h4>View Auction</h4>

    <b-row>
      <b-col xs="12" md="7">
        <h2 style="display: inline-block">{{ auction.title }}</h2>

        <b-btn class="float-right"
               v-if="canEdit"
               :to="{ name: 'edit-auction', params: {id: this.$route.params.id} }">
          Edit
        </b-btn>

        <b-card class="mb-3" id="preview">
          <b-img :src="this.$apiUrl + '/auctions/' + $route.params.id + '/photos'"></b-img>
        </b-card>

        <h4>Details</h4>

        <p>
          {{ auction.description }}
          <br>Category: {{ auction.categoryTitle }}
          <br>Seller: <b-link :to="{ name: 'user-view', params: { id: auction.seller.id } }">{{ auction.seller.username }}</b-link>
        </p>

        <p>
          {{ startDateString }}
          <br>{{ endDateString }}
        </p>
      </b-col>

      <b-col xs="12" md="1"></b-col>

      <b-col xs="12" md="4">
        <h4>Bids</h4>

        <p>
          Reserve Price: {{ reservePriceAsCurrency }}
          <br>Starting Bid: {{ startingBidAsCurrency }}
        </p>

        <bid-panel class="mb-3" :session="session" :auction="auction"/>
      </b-col>

    </b-row>

  </b-container>
</template>

<script>
  import {amountAsCurrency, formatDateTimeAbsolute} from "../helpers";
  import BidPanel from "../bid/BidPanel";

  export default {
    components: {BidPanel},
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
      reservePriceAsCurrency: function () {
        return amountAsCurrency(this.auction.reservePrice);
      },
      startingBidAsCurrency: function () {
        return amountAsCurrency(this.auction.startingBid);
      },
      canEdit: function () {
        return this.session.loggedIn &&
          parseInt(this.auction.seller.id) === parseInt(this.session.user.id) &&
          Date.now() < this.auction.startDateTime;
      }
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
    },

    mounted: function () {
      this.getAuction();
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
