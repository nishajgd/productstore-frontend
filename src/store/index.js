import vueResource from 'vue-resource'
import Vue from 'vue'
import Vuex from 'vuex'
const API_BASE = 'https://productstore-backend.herokuapp.com/api/v1'

Vue.use(Vuex)
// TODO: Add Getters in separate file //
// Product Getters Start //

// Product Getters End //

export const productGetters = {
  // All products
  allProducts: (state, getters) => {
    return state.products
  },
  // All products
  searchProducts: (state, getters) => {
    return state.products
  },

  // Get Product by ID
  productById: (state, getters) => id => {
    if (getters.allProducts.length > 0) {
      return getters.allProducts.filter(p => p._id === id)[0]
    } else {
      return state.product
    }
  }
}
// TODO: Add Mutations in separate file //
// Product Mutations Start //
import {
  PRODUCT_BY_ID,
  PRODUCT_BY_ID_SUCCESS,
  ALL_PRODUCTS,
  ALL_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_SUCCESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_SEARCH_PARAMS,
  REMOVE_SEARCH_PARAMS
} from './mutation-types'

export const productMutations = {
  [ALL_PRODUCTS] (state) {
    // Called when fetching products
    state.showLoader = true
  },
  [ALL_PRODUCTS_SUCCESS] (state, payload) {
    // Called when products have been fetched
    state.showLoader = false
    // Updates state products
    state.products = payload
  },
  [SEARCH_PRODUCTS] (state) {
    // Called when fetching products
    state.showLoader = true
  },
  [SEARCH_PRODUCTS_SUCCESS] (state, payload) {
    // Called when products have been fetched
    state.showLoader = false
    // Updates state products
    state.products = payload
  },
  [PRODUCT_BY_ID] (state) {
    // Called when fetching products by ID
    state.showLoader = true
  },
  [PRODUCT_BY_ID_SUCCESS] (state, payload) {
    // Called when product is fetched
    state.showLoader = false
    // Updates state product
    state.product = payload
  },
  [ADD_SEARCH_PARAMS]: (state, payload) => state.searchQuery.push(payload),
  [REMOVE_SEARCH_PARAMS]: (state, payload) => {
    const searchIndex = state.searchQuery.indexOf(payload)
    const searchLength = state.searchQuery.length
    if (searchLength > 0){
      state.searchQuery.splice(searchIndex, 1)
      console.log(state.searchQuery, state.searchQuery.length, searchIndex)
    }
  }
}
export const cartMutations = {
  [ADD_TO_CART]: (state, payload) => state.cart.push(payload),
  [REMOVE_FROM_CART]: (state, payload) => {
    const index = state.cart.indexOf(payload)
    state.cart.splice(index, 1)
    console.log(state.cart, state.cart.length, index)
  }
}
// Product Mutations End //


// TODO: Add Actions in separate file //
// Product Actions Start //
export const productActions = {
  allProducts ({commit}) {
    commit(ALL_PRODUCTS)
    Vue.http.get(`${API_BASE}/products`).then(response => {
      commit(ALL_PRODUCTS_SUCCESS, response.data)
    })
  },

  searchProducts ({commit}, payload) {
    console.log("In actions - in searchProducts")
    console.log(payload)
    commit(SEARCH_PRODUCTS)
    Vue.http.get(`${API_BASE}/products`, {params: payload}).then(response => {
      commit(SEARCH_PRODUCTS_SUCCESS, response.data)
    })
  },

  productById ({commit}, payload) {
    commit(PRODUCT_BY_ID)
    // Fetch product by ID from API
    Vue.http.get(`${API_BASE}/products/${payload}`).then(response => {
      commit(PRODUCT_BY_ID_SUCCESS, response.data.data)
    })
  }
}  
// Product Actions End //

export default new Vuex.Store({
  strict: true,
  state: {
  	showLoader: false,
    // selected product
    product: {},
    // all products
    products: [],
    cart: [],
    searchQuery: []
  },
  getters: Object.assign({}, productGetters),
  mutations: Object.assign({}, productMutations, cartMutations),
  actions: Object.assign({}, productActions)
})  