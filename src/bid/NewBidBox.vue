<template>
  <b-list-group-item>
    <h5>New bid</h5>

    <b-form @submit="onSubmit">
      <b-form-group label="Enter amount">
        <b-input-group prepend="$">
          <b-form-input placeholder="Amount"
                        v-model="amount"
                        type="text"
                        :state="amountValid">
          </b-form-input>
          <b-input-group-append>
            <b-btn type="submit" variant="primary">
              Make bid
            </b-btn>
          </b-input-group-append>
        </b-input-group>
        <template slot="invalid-feedback">{{ invalidFeedback }}</template>
      </b-form-group>

    </b-form>

  </b-list-group-item>
</template>

<script>
  import {dollarStringToCents} from "../helpers";

  export default {
    name: "new-bid-box",
    props: ['session', 'auctionId', 'minNextBid', 'bids'],

    data() {
      return {
        amount: "",
        nextBid: this.minNextBid
      }
    },

    computed: {
      amountInCents: function () {
        return dollarStringToCents(this.amount);
      },
      amountValid: function () {
        if (this.amount === "") {
          return null;
        } else {
          return this.amountInCents >= this.nextBid;
        }
      },
      invalidFeedback: function () {
        return "Bid must be higher than the current/starting bid.";
      }
    },

    methods: {
      onSubmit: function (event) {
        event.preventDefault();
        if (this.amountValid) {
          this.postBid();
        }
      },
      postBid: function () {
        let bidData = {
          amount: this.amountInCents
        };
        this.$http.post(this.$apiUrl + '/auctions/' + this.auctionId + '/bids', {},
          { params: bidData, headers: {'X-Authorization': this.session.token} })
          .then(function (response) {
            bidData.datetime = Date.now();
            bidData.buyerId = this.session.user.id;
            bidData.buyerUsername = this.session.user.username;
            this.bids.push(bidData);
            this.nextBid = bidData.amount + 1;
          })
          .catch(function (error) {
            // TODO do something clever
          });
      }
    }

  }
</script>

<style scoped>

</style>
