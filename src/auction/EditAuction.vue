<template>
  <b-container>
    <h4>Edit Auction</h4>

    <b-form @submit="onSubmit">
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
                <b-form-input v-model="startDate" placeholder="yyyy-mm-dd" type="date"
                              :state="startDateTimeValid" required></b-form-input>
              </b-col>
              <b-col>
                <b-form-input v-model="startTime" placeholder="hh:mm" type="time"
                              :state="startDateTimeValid" required></b-form-input>
              </b-col>
            </b-row>
            <div class="invalid-error" v-if="startDateTimeValid === false">
              Auction start must be in the future.
            </div>
          </b-form-group>

          <b-form-group label="Choose when the auction will end">
            <b-row>
              <b-col>
                <b-form-input v-model="endDate" placeholder="yyyy-mm-dd" type="date"
                              :state="endDateTimeValid" required></b-form-input>
              </b-col>
              <b-col>
                <b-form-input v-model="endTime" placeholder="hh:mm" type="time"
                              :state="endDateTimeValid" required></b-form-input>
              </b-col>
            </b-row>
            <div class="invalid-error" v-if="endDateTimeValid === false">
              The auction's end must be after it starts.
            </div>
          </b-form-group>

          <b-form-group label="Choose a reserve price">
            <b-input-group prepend="$">
              <b-form-input placeholder="Amount"
                            v-model="reservePrice"
                            type="text"
                            :state="reservePriceValid"
                            required>
              </b-form-input>
            </b-input-group>
            <div class="invalid-error" v-if="reservePriceValid === false">
              Reserve price must be a non-negative number.
            </div>
          </b-form-group>

          <b-form-group label="Choose a starting bid">
            <b-input-group prepend="$">
              <b-form-input placeholder="Amount"
                            v-model="startingBid"
                            type="text"
                            :state="startingBidValid"
                            required>
              </b-form-input>
            </b-input-group>
            <div class="invalid-error" v-if="startingBidValid === false">
              Starting bid must be a number greater than 0.
            </div>
          </b-form-group>

        </b-col>

        <b-col xs="12" md="1"></b-col>

        <b-col xs="12" md="5">
          <b-form-group label="Choose a photo">
            <b-input-group>
              <b-form-file @change="onPhotoChange"
                           v-model="photo"
                           ref="photoinput"
                           accept="image/jpeg, image/png"
                           :state="photoValid">
              </b-form-file>
              <b-input-group-append>
                <b-button @click="clearPhotoInput">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
            <div class="invalid-error" v-if="photoValid === false">
              That is not a valid photo. Photos must be either PNG or JPEG files.
            </div>
          </b-form-group>

          <b-card id="preview" v-if="!photoChanged">
            <b-img :src="imgPath()"></b-img>
          </b-card>
          <b-card id="preview" v-else-if="previewUrl && photoValid">
            <b-img :src="previewUrl"></b-img>
          </b-card>
        </b-col>

        <b-col class="my-3" xs="12">
          <b-button type="submit" variant="primary">Save Changes</b-button>
          <b-button :to="{ name: 'auction-view', params: {id: this.$route.params.id} }">Cancel</b-button>
          <loading-spinner class="float-right" :loading="loading" />
        </b-col>

      </b-row>
    </b-form>
  </b-container>
</template>

<script>
  import LoadingSpinner from "../misc/LoadingSpinner";
  import {dollarStringToCents, formatEpochMillisForInput} from "../helpers";

  export default {
    components: {LoadingSpinner},
    name: "edit-auction",
    props: ['session'],

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
        photoChanged: false,
        photo: null,
        previewUrl: null,
        categories: [],
        auction: null,
        error: "",
        loading: false
      }
    },

    computed: {
      startDateTime: function () {
        return Date.parse(this.startDate + " " + this.startTime);
      },
      endDateTime: function () {
        return Date.parse(this.endDate + " " + this.endTime);
      },
      reservePriceInCents: function () {
        return dollarStringToCents(this.reservePrice);
      },
      startingBidInCents: function () {
        return dollarStringToCents(this.startingBid);
      },
      photoContentType: function () {
        const photoNameLower = this.photo.name.toLowerCase();
        if (photoNameLower.endsWith(".png")) {
          return "image/png";
        } else if (photoNameLower.endsWith(".jpg") || photoNameLower.endsWith(".jpeg")) {
          return "image/jpeg";
        } else {
          return "";
        }
      },
      photoValid: function () {
        return this.photo === null ? null : this.photoContentType !== "";
      },
      startDateTimeValid: function () {
        if (this.startDate === "" && this.startTime === "") {
          return null;
        } else {
          return !isNaN(this.startDateTime) && this.startDateTime > Date.now();
        }
      },
      endDateTimeValid: function () {
        if (this.endDate === "" && this.endTime === "") {
          return null;
        } else {
          return !isNaN(this.endDateTime) && this.endDateTime > this.startDateTime
        }
      },
      reservePriceValid: function () {
        return this.reservePrice === "" ? null : this.reservePriceInCents >= 0;
      },
      startingBidValid: function () {
        return this.startingBid === "" ? null : this.startingBidInCents > 0;
      },
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
      clearPhotoInput: function () {
        this.photoChanged = true;
        this.$refs.photoinput.reset();
      },
      onPhotoChange: function (event) {
        const file = event.target.files[0];
        this.previewUrl = URL.createObjectURL(file);
        this.photoChanged = true;
      },
      onSubmit: function (event) {
        event.preventDefault();
        if (this.startDateTimeValid && this.endDateTimeValid &&
          this.reservePriceValid && this.startingBidValid &&
          this.photoValid !== false) {
          this.updateAuction()
        }
      },
      imgPath: function () {
        return this.$apiUrl + '/auctions/' + this.$route.params.id + '/photos' + "?token=" + Date.now();
      },
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
      getAuction: function () {
        this.$http.get(this.$apiUrl + '/auctions/' + this.$route.params.id)
          .then(function (response) {
            this.auction = response.data;
            this.categoryId = this.auction.categoryId;
            this.title = this.auction.title;
            this.description = this.auction.description;

            // TODO get start/end date & time strings from epochmillis
            let formatted = formatEpochMillisForInput(this.auction.startDateTime);
            this.startDate = formatted[0];
            this.startTime = formatted[1];

            formatted = formatEpochMillisForInput(this.auction.endDateTime);
            this.endDate = formatted[0];
            this.endTime = formatted[1];

            this.reservePrice = this.auction.reservePrice / 100;
            this.startingBid = this.auction.startingBid / 100;

          })
          .catch(function (error) {
            // TODO deal with error
          });
      },
      updateAuction: function() {
        this.loading = true;

        let updateData = {};
        if (this.categoryId !== this.auction.categoryId) {
          updateData.categoryId = this.categoryId;
        }
        if (this.title !== this.auction.title) {
          updateData.title = this.title;
        }
        if (this.description !== this.auction.description) {
          updateData.description = this.description;
        }
        if (this.startDateTime !== this.auction.startDateTime) {
          updateData.startDateTime = this.startDateTime;
        }
        if (this.endDateTime !== this.auction.endDateTime) {
          updateData.endDateTime = this.endDateTime;
        }
        if (this.reservePriceInCents !== this.auction.reservePrice) {
          updateData.reservePrice = this.reservePriceInCents;
        }
        if (this.startingBidInCents !== this.auction.startingBid) {
          updateData.startingBid = this.startingBidInCents;
        }

        this.$http.patch(this.$apiUrl + '/auctions/' + this.$route.params.id, updateData,
          { emulateJSON: false, headers: {'X-Authorization': this.session.token} })
          .then(function () {
            if (this.photoChanged) {
              if (this.photo === null) {
                return this.$http.delete(this.$apiUrl + '/auctions/' + this.$route.params.id + '/photos',
                  { headers: {'X-Authorization': this.session.token} });
              } else {
                return this.$http.post(this.$apiUrl + '/auctions/' + this.$route.params.id + '/photos', this.photo,
                  { emulateJSON: false, headers: {'X-Authorization': this.session.token, 'Content-Type': this.photoContentType} });
              }
            }
          })
          .then(function () {
            this.loading = false;
            this.$router.push({ name: 'auction-view', params: { id: this.$route.params.id } });
          })
          .catch(function (error) {
            this.loading = false;
            // TODO do something clever
          });
      }
    },

    watch: {
      'session.loggedIn': function (newVal, oldVal) {
        if (newVal === false) {
          this.$router.push({ name: 'auction-view', params: {id: this.$route.params.id} });
        }
      }
    },

    mounted: function () {
      this.getAuction();
      this.getCategories();
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

  .invalid-error {
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545;
  }
</style>
