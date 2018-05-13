<template>
  <div>
    <h1>Auctions</h1>
    <p>why hello again.</p>
    <h3>Current Auctions:</h3>
    <p>{{ error }}</p>
    <table>
      <tr>
        <th>Title</th>
        <th>Category</th>
        <th>Reserve Price</th>
        <th>Current Bid</th>
        <th>Starting</th>
        <th>Ending</th>
      </tr>
      <tr v-for="auction in auctions">
        <td>{{ auction.title }}</td>
        <td>{{ auction.categoryTitle }}</td>
        <td>${{ auction.reservePrice }}</td>
        <td>${{ auction.currentBid }}</td>
        <td>{{ new Date(auction.startDateTime).toLocaleDateString("en-US") }}</td>
        <td>{{ new Date(auction.endDateTime).toLocaleDateString("en-US") }}</td>
      </tr>
    </table>
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
        let params = {
          "status": "all"
        };
        this.$http.get(this.$apiUrl + '/auctions', {params: params})
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
