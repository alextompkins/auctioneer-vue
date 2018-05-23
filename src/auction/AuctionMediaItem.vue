<template>
  <b-media class="mb-1">
    <b-img slot="aside" :src="imgPath()" width="100"></b-img>

    <b-link :to="{ name: 'auction-view', params: { id: auction.id } }">
      <h5 class="mt-0">{{ auction.title }}</h5>
    </b-link>

    ({{ auction.categoryTitle }})

    <div>{{ bidString }}</div>

    <div v-if="hasEnded">Ended {{ endDateString }}</div>
    <div v-else-if="hasStarted">Will end {{ endDateString }}</div>
    <div v-else>Will begin {{ startDateString }}</div>

  </b-media>
</template>

<script>
  import {amountAsCurrency, formatDateTimeAbsolute} from "../helpers";

  export default {
    name: "auction-media-item",
    props: ['auction'],

    computed: {
      hasStarted: function() {
        return Date.now() >= this.auction.startDateTime;
      },
      hasEnded: function () {
        return Date.now() >= this.auction.endDateTime;
      },
      hasBids: function () {
        return this.auction.currentBid !== 0;
      },
      startDateString: function () {
        return formatDateTimeAbsolute(this.auction.startDateTime);
      },
      endDateString: function () {
        return formatDateTimeAbsolute(this.auction.endDateTime)
      },
      currentBidAsCurrency: function () {
        return amountAsCurrency(this.auction.currentBid);
      },
      startingBidAsCurrency: function () {
        return amountAsCurrency(this.auction.startingBid);
      },
      bidString: function () {
        if (this.hasEnded) {
          if (this.hasBids) {
            return "Winning bid was " + this.currentBidAsCurrency + ".";
          } else {
            return "This auction expired without any bids.";
          }
        } else if (this.hasStarted) {
          if (this.hasBids) {
            return "Current bid is " + this.currentBidAsCurrency + ".";
          } else {
            return "No bids on this auction yet.";
          }
        } else {
          return "This auction has not yet begun.";
        }
      }
    },

    methods: {
      imgPath: function () {
        return this.$apiUrl + '/auctions/' + this.auction.id + '/photos' + "?token=" + Date.now();
      }
    }
  }
</script>

<style scoped>
  h5 {
    display: inline-block;
    margin-bottom: 0;
  }
  img {
    max-height: 100px;
  }
</style>
