<template>
  <div class="search-row">
    <div>
      <div class="float-left">
        
        <div id='categoryDiv' class="float-left" style="text-align:left;">
          <b>Categories:</b>
          <div v-for="category in categories">
            <input :id="category" type="checkbox" :value="category" v-model="checkedCategories">
            <label :for="category">
              {{ category }}
            </label>
          </div>
        </div>

        <div id='priceDiv' class="float-left" style="text-align:left;">
          <b>Price:</b>
          <div v-for="price in prices">
            <input :id="price.key" type="checkbox" :value="price.key" v-model="checkedPriceRange">
            <label :for="price.key">
              {{ price.value }}
            </label>
          </div>
        </div>
        </br>
      </div>
        
      <div class="float-right">
        <b>Sort By:</b>
        <select v-model="sortSelected">
          <option v-for="option in options" v-bind:value="option.value" v-on:change="searchProducts">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div style="clear:both;"></div>
      <button type="button" class="btn-primary search-btn float-left" v-on:click="searchProducts">Search</button>
      <div style="clear:both;"></div>
    </div>   
  </div>
</template>

<script>
  import { DEFAULT_CATEGORIES, DEFAULT_PRICE_RANGE, DEFAULT_PRICE_SORT_OPTIONS } from '../components/SearchParameters.html'
  export default {
    name: 'product-search',
    data(){
      return {
        checkedCategories: [],
        checkedPriceRange: [],
        products: [],
        categories: DEFAULT_CATEGORIES,
        prices: DEFAULT_PRICE_RANGE,
        sortSelected: '',
        options: DEFAULT_PRICE_SORT_OPTIONS
      }
    },
    watch: {
      'sortSelected': function(){
        this.searchProducts();
      }
    },
    methods: {
      searchProducts: function(){ 
        this.$emit('filter', {categories: this.checkedCategories, price: this.checkedPriceRange, sort: this.sortSelected} );
      }
    } 
  }
</script>
