<template>
  <div class="loader" v-if="loading"></div>
</template>

<script>
  export default {
    name: "loading-spinner",
    props: ['loading']
  }
</script>

<style scoped>
  .loader {
    display: inline-block;
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #007bff;; /* Blue */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
