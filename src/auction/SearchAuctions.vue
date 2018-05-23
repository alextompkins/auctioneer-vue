<template>
  <b-container>
    <h1>Search Auctions</h1>

    <!-- Filter Controls -->
    <b-alert variant="danger" show
             v-if="errorFlag">
      <strong>An error occurred:</strong>
      <br>{{ error }}
    </b-alert>

    <b-form class="mb-3">
      <b-form-row>
        <b-col lg="2" xs="12">
          <b-form-group label="Filter by status">
            <b-form-select v-model="statusFilter"
                           :options="statusFilterOptions">
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col lg="3" xs="12">
          <b-form-group label="Filter by title">
            <b-form-input v-model="titleFilter"
                          type="text"
                          placeholder="Title">
            </b-form-input>
          </b-form-group>
        </b-col>

        <b-col lg="2" xs="12">
          <b-form-group label="Filter by category">
            <b-form-select v-model="categoryFilter"
                           :options="this.getCategoryOptions()">
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col lg="5" xs="0"></b-col>
      </b-form-row>

      <b-form-checkbox v-if="session.loggedIn" v-model="onlyBiddedFilter">
        Only include auctions I have bid on.
      </b-form-checkbox>

      <nav class="mt-3">
        <ul class="pagination">
          <li class="page-item disabled" v-if="this.prevDisabled"><a class="page-link">Previous</a></li>
          <li class="page-item" v-else><a class="page-link" v-on:click="prevPage">Previous</a></li>

          <li class="page-item disabled"><span class="page-link">{{ currentPageSpan }}</span></li>

          <li class="page-item" v-if="nextDisabled"><a class="page-link">Next</a></li>
          <li class="page-item" v-else><a class="page-link" v-on:click="nextPage">Next</a></li>
        </ul>
      </nav>
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

  const ITEMS_PER_PAGE = 5;

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
        onlyBiddedFilter: false,
        categories: [],
        auctions: [],
        currentPage: 0,
        nextDisabled: false
      }
    },

    computed: {
      prevDisabled: function () {
        return this.currentPage <= 0;
      },
      currentPageSpan: function () {
        return (ITEMS_PER_PAGE * this.currentPage + 1) + "-" + (ITEMS_PER_PAGE * (this.currentPage + 1));
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
      },
      onlyBiddedFilter: function () {
        this.getAuctions();
      },
      'session.loggedIn': function (newVal, oldVal) {
        if (newVal === false) {
          this.onlyBiddedFilter = false;
        }
      }
    },

    mounted: function () {
      this.getAuctions();
      this.getCategories();
    },

    methods: {
      prevPage: function () {
        this.currentPage--;
        this.getAuctions();
      },
      nextPage: function () {
        this.currentPage++;
        this.getAuctions();
      },
      getAuctions: function () {
        let params = {
          "status": this.statusFilter.toLowerCase(),
          "q": this.titleFilter,
          "category-id": this.categoryFilter
        };

        if (this.onlyBiddedFilter) {
          params["bidder"] = this.session.user.id;
        }

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
        options.push({text: "Any", value: ""});
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

<style scoped>

</style>
