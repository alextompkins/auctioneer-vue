<template>
  <b-container>
    <h1>Auctions</h1>

    <b-alert variant="danger" show
      v-if="errorFlag">
      <strong>An error occurred:</strong>
      <br>{{ error }}
    </b-alert>

    <b-form class="mb-3" inline>
      <b-form-select class="mb-2 mr-sm-2 mb-sm-0"
        v-model="statusFilter"
        :options="statusFilterOptions">
      </b-form-select>

      <b-form-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          v-model="titleFilter"
          type="text"
          placeholder="Auction Title"></b-form-input>
      </b-form-group>

      <b-form-select class="mb-2 mr-sm-2 mb-sm-0"
        v-model="categoryFilter"
        :options="categoryFilterOptions">
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
        titleFilter: "",
        categoryFilter: "",
        categoryFilterOptions: [],
        auctions: []
      }
    },

    watch: {
      statusFilter: function () {
        this.getAuctions();
      },
      titleFilter: function () {
        this.getAuctions();
      }
    },

    mounted: function () {
      this.getAuctions();
    },

    methods: {
      getAuctions: function () {
        let params = {
          "status": this.statusFilter.toLowerCase(),
          "q": this.titleFilter
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
