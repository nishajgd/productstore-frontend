<template>
  <div>
    <product-list></product-list>
  </div>
</template>

<script>
  import ProductList from '../components/ProductList.vue'
  export default {
    name: 'home',
    components: {
      'product-list': ProductList
    }
  }
</script>
