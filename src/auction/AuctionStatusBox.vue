<template>
  <b-list-group-item variant="info" v-if="!hasStarted">
    <h5>Auction will start...</h5>
    {{ timeToOrFromStart }}
  </b-list-group-item>
  <b-list-group-item variant="success" v-else-if="!hasEnded">
    <h5>Auction will end...</h5>
    {{ timeToOrFromEnd }}
  </b-list-group-item>
  <b-list-group-item variant="dark" v-else="hasEnded">
    <h5>Auction has ended</h5>
    {{ timeToOrFromEnd }}
  </b-list-group-item>
</template>

<script>
  import {formatTimeRelative} from "../helpers";

  export default {
    name: "auction-status-box",
    props: ['auction'],

    data() {
      return {
        currentTime: Date.now()
      }
    },

    computed: {
      timeToOrFromStart: function () {
        return formatTimeRelative(this.auction.startDateTime, this.currentTime);
      },
      timeToOrFromEnd: function () {
        return formatTimeRelative(this.auction.endDateTime, this.currentTime);
      },
      hasStarted: function() {
        return this.currentTime >= this.auction.startDateTime;
      },
      hasEnded: function () {
        return this.currentTime >= this.auction.endDateTime;
      }
    },

    created: function () {
      setInterval(() => this.currentTime = Date.now(), 1000);
    }

  }
</script>

<style scoped>

</style>
