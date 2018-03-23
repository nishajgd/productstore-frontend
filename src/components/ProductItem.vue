<template>
  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div class="product">
      <div class="my-list show-image">
        <span v-if='product.attributes["sold-out"] == true' class="out-of-stock">Out of Stock</span>
        <img src="../assets/product_default_image.jpg">
        <span  class="heart-image"><img src="../assets/heart_white.png" class="heart_white"></span>
        <span v-if="showHeart"><img src="../assets/heart_red.jpeg" class="heart_red"></span>
        <span v-if="showHeartOutline"><img src="../assets/heart_white.png" class="heart_white"></span>
        
        <h3>{{product.attributes.name}}</h3>
        <span>${{product.attributes.price}} </span>
        <span class="pull-right">{{product.attributes.category}}</span>
        <div class="offer">Extra {{ product.attributes["sale-text"]}} OFF</div>
        <router-link :to="'/details/'+product.id" class="product-link"> 
          <div class="offer link">View Details </div>
        </router-link>
        <product-button :product="product" ></product-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductButton from '../components/ProductButton'
  export default {
    name: 'product-item',
    props: ['product'],
    components: {
      'product-button': ProductButton
    },
    data () {
      return {
        cart: this.$store.state.cart
      }
    },
    computed: {
      showHeartOutline() {
        return this.cart.indexOf(this.product) >= 0 && this.product.attributes["sold-out"] === true
      },
      showHeart () {
        return this.cart.indexOf(this.product) >= 0 && this.product.attributes["sold-out"] === false
      }
    }
  }
</script>
<style lang="scss">
  @import 'src/assets/product_item.css.scss';
</style>
