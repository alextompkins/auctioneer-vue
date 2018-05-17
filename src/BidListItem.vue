<template>
  <b-list-group-item>
    <b-link>{{ bid.buyerUsername }}</b-link>
    <div class="d-flex w-100 justify-content-between">
      <h2>${{ bid.amount }}</h2>
      <small class="mt-auto">{{ datetimeString }}</small>
    </div>
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
