<template>
  <b-media class="mb-1">
    <b-img slot="aside" :src="this.$apiUrl + '/auctions/' + auction.id + '/photos'" width="100" alt="placeholder" ></b-img>
    <b-link :to="{ name: 'auction-view', params: { id: auction.id } }">
      <h5 class="mt-0">{{ auction.title }}</h5>
    </b-link>
    ({{ auction.categoryTitle }})
    <p>
      Current bid is {{ currentBidAsCurrency }}
      <br>Auction ends on {{ endDateString }}.
    </p>
  </b-media>
</template>

<script>
  import {amountAsCurrency, formatDateTimeAbsolute} from "../helpers";

  export default {
    name: "auction-media-item",
    props: ['auction'],

    computed: {
      endDateString: function () {
        return formatDateTimeAbsolute(this.auction.endDateTime)
      },
      currentBidAsCurrency: function () {
        return amountAsCurrency(this.auction.currentBid);
      }
    }
  }
</script>

<style scoped>
  h5 {
    display: inline-block;
  }
</style>
