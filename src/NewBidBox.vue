<template>
  <b-list-group-item>
    <h5>New bid</h5>

    <b-form>
      <b-form-group label="Enter amount">
        <b-input-group prepend="$">
          <b-form-input placeholder="Amount"
                        v-model="amount"
                        type="text"
                        required>
          </b-form-input>
          <b-input-group-append>
            <b-btn variant="primary">
              Make bid
            </b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

    </b-form>

  </b-list-group-item>
</template>

<script>
  export default {
    name: "new-bid-box",
    props: ['session', 'auctionId'],

    data() {
      return {
        amount: ""
      }
    },

    computed: {
      intAmount: function () {
        if (isNaN(this.amount)) {
          return NaN;
        } else {
          return parseFloat(this.amount) * 100;
        }
      }
    },

    methods: {
      onSubmit: function (event) {
        event.preventDefault();
        if (isNaN(this.intAmount)) {
          this.postBid();
        }
      },
      postBid: function () {

      }
    }

  }
</script>

<style scoped>

</style>
