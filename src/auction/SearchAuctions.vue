<template>
  <b-container>
    <h1>Search Auctions</h1>

    <!-- Filter Controls -->
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
        :options="this.getCategoryOptions()">
      </b-form-select>
    </b-form>

    <!-- Auctions List -->
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
    name: "search-auctions",
    props: ['session'],

    data() {
      return {
        error: "",
        errorFlag: false,
        statusFilter: "All",
        statusFilterOptions: ["All", "Active", "Expired", "Upcoming", "Won"],
        titleFilter: "",
        categoryFilter: "",
        categories: [],
        auctions: []
      }
    },

    watch: {
      statusFilter: function () {
        this.getAuctions();
      },
      titleFilter: function () {
        this.getAuctions();
      },
      categoryFilter: function () {
        this.getAuctions();
      }
    },

    mounted: function () {
      this.getAuctions();
      this.getCategories();
    },

    methods: {
      getAuctions: function () {
        let params = {
          "status": this.statusFilter.toLowerCase(),
          "q": this.titleFilter,
          "category-id": this.categoryFilter
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
      },
      getCategories: function () {
        this.$http.get(this.$apiUrl + '/categories')
          .then(function (response) {
            this.categories = response.data;
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
              this.error = "A miscellaneous error occurred when retrieving categories.";
            }
          });
      },
      getCategoryOptions: function () {
        let options = [];
        options.push({ text: "Any", value: "" });
        for (let category of this.categories) {
          options.push({
              text: category.categoryTitle.charAt(0).toUpperCase() + category.categoryTitle.slice(1),
              value: category.categoryId
            });
        }
        return options;
      }

    }
  }
</script>