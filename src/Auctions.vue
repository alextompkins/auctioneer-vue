<template>
  <div>
    <h1>Auctions Page</h1>
    <p>why hello again.</p>
    <p>This is the current error: </p>
    <p>{{ error }}</p>
    <ul>
      <li v-for="auction in auctions">
        {{ auction.title }} {{ auction.categoryTitle }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        error: "",
        errorFlag: false,
        auctions: []
      }
    },

    mounted: function () {
      this.getAuctions();
    },

    methods: {
      getAuctions: function () {
        this.$http.get(this.$apiUrl + '/auctions?status=all')
          .then(function (response) {
            this.auctions = response.data;
          })
          .catch(function (error) {
            this.error = error;
            this.errorFlag = true;
          });
      }
    }

  }
</script>
