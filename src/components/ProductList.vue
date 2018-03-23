<template>
  <div>
    <div class="products">
      <div class="container">
        <template>
          <product-search v-on:filter="search"></product-search>
        </template>
        <div v-if="this.$store.state.showLoader" id="loading">
          <img src="../assets/Triangles.gif" id="loading-image">
        </div>
        <div class="row" v-else>
          <template v-for="product in products" class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <product-item :product="product" ></product-item>
          </template>
        </div>
        <div class="pagination">
          <button class="btn btn-default" @click="fetchProducts(pagination.prev_page)"
          :disabled="!pagination.prev_page_url">
              Previous
          </button>

          <span class="page-details"> Page {{pagination.current_page}}  of {{pagination.last_page}} </span>

          <button class="btn btn-default" @click="fetchProducts(pagination.next_page)"
          :disabled="!pagination.next_page_url">
              Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ADD_SEARCH_PARAMS, REMOVE_SEARCH_PARAMS } from '../store/mutation-types'
  import ProductSearch from '../components/ProductSearch.vue'
  import ProductItem from '../components/ProductItem.vue'
  export default {
    name: 'product-list',
    data () {
      return {
        pagination: {},
        response: [],
        searchQuery: this.$store.state.searchQuery
      }
    },
    created () {
      if (this.products.length === 0) {
        this.$store.dispatch('allProducts')
      }
    },
    computed: {
      products() {
        var response = this.$store.getters.allProducts
        if (Object.keys(response).length === 0)
          { return response; }
        else {
          var pagination = this.setPagination(response);
          this.pagination = pagination;
          return response.data
        }
      }
    },
    components: {
      'product-item': ProductItem,
      'product-search': ProductSearch
    },
    methods: {
      search: function(payload){
        this.updateSearchQuery(payload);
        this.$store.dispatch('searchProducts', {categories: payload.categories, price: payload.price, sort: payload.sort})
      },
      updateSearchQuery: function (payload){
        //Remove search query from store
        this.$store.commit(REMOVE_SEARCH_PARAMS, payload)
        //Add search query to store
        this.$store.commit(ADD_SEARCH_PARAMS, payload);
      },
      fetchProducts: function(page){
        if (this.searchQuery.length > 0){
          var searchHash = this.searchQuery[0]
          var payload = {categories: searchHash.categories, price: searchHash.price, sort: searchHash.sort, page: page}
        }
        else { var payload = {page: page} }
        this.$store.dispatch('searchProducts', payload)
      },
      setPagination: function (response){
        var pagination = {
          current_page: response.meta["current-page"],
          last_page: response.meta["total-pages"],
          next_page: response.meta["next-page"],
          prev_page: response.meta["prev_page"],
          next_page_url: response.links.next,
          prev_page_url: response.links.prev
        }
        return pagination;
      }
    }  
  }
</script>
<style lang="scss">
  @import 'src/assets/product_search.css.scss';
</style>
