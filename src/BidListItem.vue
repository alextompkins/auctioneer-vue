<template>
  <b-list-group-item>
    <b-link>{{ bid.buyerUsername }}</b-link>
    <div class="d-flex w-100 justify-content-between">
      <h2>{{ amountAsCurrency }}</h2>
      <small class="mt-auto">{{ datetimeString }}</small>
    </div>
  </b-list-group-item>
</template>

<script>
  export default {
    name: "bid-list-item",
    props: ['bid'],
    computed: {
      amountAsCurrency: function () {
        const formatter = new Intl.NumberFormat("en-NZ", {
          style: "currency",
          currency: "NZD",
          minimumFractionDigits: 2
        });
        return formatter.format(this.bid.amount / 100)
      },
      datetimeString: function () {
        return new Date(this.bid.datetime).toLocaleString("en-NZ");
      }
    }
  }
</script>

<style scoped>

</style>
