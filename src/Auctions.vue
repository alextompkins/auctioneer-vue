<template>
  <div>
    <h1>Auctions</h1>
    <p>why hello again.</p>

    <h3>Current Auctions:</h3>

    <form>
      <select v-model="statusFilter">
        <option
          v-for="option in statusFilterOptions"
          v-bind:value="option"
          v-on:
        >{{ option }}</option>
      </select>
    </form>

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
        <td>{{ new Date(auction.startDateTime).toLocaleDateString("en-NZ") }}</td>
        <td>{{ new Date(auction.endDateTime).toLocaleDateString("en-NZ") }}</td>
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
        statusFilter: 'all',
        statusFilterOptions: ["all", "active", "expired", "upcoming", "won"],
        auctions: []
      }
    },

    watch: {
      statusFilter: function () {
        this.getAuctions();
      }
    },

    mounted: function () {
      this.getAuctions();
    },

    methods: {
      getAuctions: function () {
        let params = {
          "status": this.statusFilter
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
