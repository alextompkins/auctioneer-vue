<template>
  <b-media class="mb-1">
    <b-img slot="aside" :src="this.$apiUrl + '/auctions/' + auction.id + '/photos'" width="100" alt="placeholder" ></b-img>
    <h5 class="mt-0">{{ auction.title }}</h5>
    <p>
      Current bid is ${{ auction.currentBid }}
      <br>Auction ends on {{ new Date(auction.endDateTime).toLocaleDateString("en-NZ") }}.
    </p>
  </b-media>
</template>

<script>
  export default {
    name: "auction-media-item",
    props: ['auction']
  }
</script>

<style scoped>

</style>
