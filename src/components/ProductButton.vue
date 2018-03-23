<template>
  <div class="cartButtons">
    <span v-if="isRemoveWaitlisting" class="textWaitlist"> Waitlisted </span>
    <span v-else-if="isRemoving" class="textWishlist"> Wishlisted </span>
    <button v-if="isAdding" class="button btn-primary" @click="addToCart"><i class="fa fa-cart-plus"></i> Add to Bag</button>
    <button v-else-if="isWaitlisting" class="button btn-default" @click="addToCart"><i class="fa fa-trash"></i> Waitlist Me</button>
    <button v-else-if="isRemoveWaitlisting" class="button btn-default" @click="removeFromCart(product._id)"><i class="fa fa-trash"></i><b></b> Remove Waitlist</button>
    <button v-else-if="isRemoving" class="button btn-danger" @click="removeFromCart(product._id)"><i class="fa fa-trash"></i> Remove from Bag</button>
  </div>
</template>

<script>
  import { ADD_TO_CART, REMOVE_FROM_CART } from '../store/mutation-types'
  export default {
    props: ['product'],
    data () {
      return {
        cart: this.$store.state.cart
      }
    },
    computed: {
      isAdding () {
        return this.cart.indexOf(this.product) < 0 && this.product.attributes["sold-out"] === false
      },
      isWaitlisting() {
        return this.cart.indexOf(this.product) < 0 && this.product.attributes["sold-out"] === true
      },
      isRemoveWaitlisting() {
        return this.cart.indexOf(this.product) >= 0 && this.product.attributes["sold-out"] === true
      },
      isRemoving() {
        return this.cart.indexOf(this.product) >= 0 && this.product.attributes["sold-out"] === false
      }
    },
    methods: {
      addToCart () {
        this.$store.commit(ADD_TO_CART, this.product);
     },
      removeFromCart (id) {
        this.$store.commit(REMOVE_FROM_CART, this.product)
      }
    }
  }
</script>
<style lang="scss">
  @import 'src/assets/cart.css.scss';
</style>