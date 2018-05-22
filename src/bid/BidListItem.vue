<template>
  <b-list-group-item>
    <b-link :to="{ name: 'user-view', params: { id: bid.buyerId } }">{{ bid.buyerUsername }}</b-link>
    <div class="d-flex w-100 justify-content-between">
      <h2>{{ amountAsCurrency }}</h2>
      <small class="mt-auto">{{ datetimeString }}</small>
    </div>
  </b-list-group-item>
</template>

<script>
  import {amountAsCurrency} from "../helpers";

  export default {
    name: "bid-list-item",
    props: ['bid'],
    computed: {
      amountAsCurrency: function () {
        return amountAsCurrency(this.bid.amount);
      },
      datetimeString: function () {
        return new Date(this.bid.datetime).toLocaleString("en-NZ");
      }
    }
  }
</script>

<style scoped>

</style>
