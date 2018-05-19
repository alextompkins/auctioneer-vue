<template>
  <b-list-group-item variant="info" v-if="!hasStarted">
    <h5>Auction will start...</h5>
    {{ timeToOrFromStart }}
  </b-list-group-item>
  <b-list-group-item variant="warning" v-else-if="!hasEnded">
    <h5>Auction will end...</h5>
    {{ timeToOrFromEnd }}
  </b-list-group-item>
  <b-list-group-item variant="success" v-else="hasEnded">
    <h5>Auction has ended</h5>
    {{ timeToOrFromEnd }}
  </b-list-group-item>
</template>

<script>
  import {formatTimeRelative} from "./helpers";

  export default {
    name: "auction-status-box",
    props: ['auction'],

    computed: {
      timeToOrFromStart: function () {
        return formatTimeRelative(this.auction.startDateTime);
      },
      timeToOrFromEnd: function () {
        return formatTimeRelative(this.auction.endDateTime);
      },
      hasStarted: function() {
        return Date.now() >= this.auction.startDateTime;
      },
      hasEnded: function () {
        return Date.now() >= this.auction.endDateTime;
      }
    }

  }
</script>

<style scoped>

</style>
