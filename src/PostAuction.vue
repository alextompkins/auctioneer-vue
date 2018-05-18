<template>
  <b-container>
    <h1>New Auction</h1>

    <b-form>
      <b-row>
        <b-col xs="12" md="6">
          <b-form-group label="Enter auction title">
            <b-form-input v-model="title"
                          type="text"
                          placeholder="Title"
                          required>
            </b-form-input>
          </b-form-group>

          <b-form-group label="Write auction description">
            <b-form-textarea v-model="description"
                             placeholder="Description"
                             :rows="3"
                             :max-rows="10"
                             required>
            </b-form-textarea>
          </b-form-group>

          <b-form-group label="Choose auction category">
            <b-form-select v-model="categoryId"
                           :options="this.categoryOptions"
                           required>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Choose when the auction will start">
            <b-row>
              <b-col>
                <b-form-input v-model="startDate" type="date" required></b-form-input>
              </b-col>
              <b-col>
                <b-form-input v-model="startTime" type="time" required></b-form-input>
              </b-col>
            </b-row>
          </b-form-group>

          <b-form-group label="Choose when the auction will end">
            <b-row>
              <b-col>
                <b-form-input v-model="endDate" type="date" required></b-form-input>
              </b-col>
              <b-col>
                <b-form-input v-model="endTime" type="time" required></b-form-input>
              </b-col>
            </b-row>
          </b-form-group>

          <b-form-group label="Choose a reserve price">
            <b-input-group prepend="$">
              <b-form-input placeholder="Amount"
                            v-model="reservePrice"
                            type="text"
                            :state="reservePrice === '' ? null : reservePrice >= 0"
                            required>
              </b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Choose a starting bid">
            <b-input-group prepend="$">
              <b-form-input placeholder="Amount"
                            v-model="startingBid"
                            type="text"
                            :state="startingBid === '' ? null : startingBid > 0"
                            required>
              </b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col xs="12" md="1"></b-col>

        <b-col xs="12" md="5">
          <b-form-group label="Choose a photo">
            <b-form-file @change="onPhotoChange"
                         v-model="photo"
                         accept="image/jpeg, image/png">
            </b-form-file>
          </b-form-group>

          <b-card id="preview" v-if="previewUrl">
            <b-img :src="previewUrl"></b-img>
          </b-card>
        </b-col>

      </b-row>
    </b-form>
  </b-container>
</template>

<script>
  export default {
    name: "post-auction",
    props: ['session'],

    mounted: function () {
      this.getCategories();
    },

    data() {
      return {
        categoryId: "",
        title: "",
        description: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        reservePrice: "",
        startingBid: "",
        photo: null,
        previewUrl: null,
        categories: [],
        error: ""
      }
    },

    computed: {
      categoryOptions: function () {
        let options = [];
        options.push({text: "Choose category", value: ""});
        for (let category of this.categories) {
          options.push({
            text: category.categoryTitle.charAt(0).toUpperCase() + category.categoryTitle.slice(1),
            value: category.categoryId
          });
        }
        return options;
      }
    },

    methods: {
      getCategories: function () {
        this.$http.get(this.$apiUrl + '/categories')
          .then(function (response) {
            this.categories = response.data;
          })
          .then(function () {
            this.error = "";
          })
          .catch(function (error) {
            if (error.status === 0) {
              this.error = "The web server could not be reached.";
            } else {
              this.error = "A miscellaneous error occurred when retrieving categories.";
            }
          });
      },
      onPhotoChange: function (event) {
        const file = event.target.files[0];
        this.previewUrl = URL.createObjectURL(file);
      }
    }

  }
</script>

<style scoped>
  .card-body {
    width: 100%;
  }

  #preview {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #preview img {
    width: 100%;
  }
</style>
