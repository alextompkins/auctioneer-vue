<template>
  <b-list-group-item>
    <b-link>{{ bid.buyerUsername }}</b-link>
    <h2>${{ bid.amount }}</h2>
    {{ datetimeString }}
  </b-list-group-item>
</template>

<script>
  export default {
    name: "bid-list-item",
    props: ['bid'],
    computed: {
      datetimeString: function () {
        return new Date(this.bid.datetime).toLocaleString("en-NZ");
      }
    }
  }
</script>

<style scoped>

</style>
