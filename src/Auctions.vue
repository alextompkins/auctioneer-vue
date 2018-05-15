<template>
  <b-container>
    <h1>Auctions</h1>

    <b-alert variant="danger" show
      v-if="errorFlag">
      <strong>An error occurred:</strong>
      <br>{{ error }}
    </b-alert>

    <b-form inline>
      <b-form-select
        v-model="statusFilter"
        :options="statusFilterOptions"
        class="mb-3">
      </b-form-select>
    </b-form>

    <ul class="list-unstyled">
      <auction-media-item
        v-for="auction in auctions"
        :auction="auction"
        :key="auction.id">
      </auction-media-item>
    </ul>

  </b-container>
</template>

<script>
  import AuctionMediaItem from "./AuctionMediaItem";

  export default {
    components: {AuctionMediaItem},
    data() {
      return {
        error: "",
        errorFlag: false,
        statusFilter: "All",
        statusFilterOptions: ["All", "Active", "Expired", "Upcoming", "Won"],
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
          "status": this.statusFilter.toLowerCase()
        };
        this.$http.get(this.$apiUrl + '/auctions', {params: params})
          .then(function (response) {
            this.auctions = response.data;
          })
          .then(function () {
            this.errorFlag = false;
            this.error = "";
          })
          .catch(function (error) {
            this.errorFlag = true;
            if (error.status === 0) {
              this.error = "The web server could not be reached.";
            } else {
              this.error = "A miscellaneous error occurred when retrieving auctions.";
            }
          });
      }
    }

  }
</script>
