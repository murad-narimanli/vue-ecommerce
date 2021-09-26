<template>
  <div class="container animated slideInUp mt-5">
    <div class="row">
      <div class="col-xl-8 animated fadeInLeft">
        <div class="bg-white rounded p-4 shadow mb-3">
          <div class="h4 fw-bold w-100">
            Your Basket
          </div>
          <div v-if="!carts.length" class="alert mt-4 animated zoomIn alert-danger" role="alert">
            You have not a product(s) in basket please add from
            <router-link tag="a" class="text-decoration-none fw-bold" exact to="/" >Products</router-link>
          </div>
          <div class="w-100 mt-4 overflow-hidden">
            <div :key="key" v-for="(cart, key) in carts" class="card shadow-sm py-md-0 py-3 px-3 mb-3 animated slideInLeft rounded">
              <div class="card-body p-2">
                <div class="row align-items-center">
                  <div class="col-md-2 mb-2 mb-md-0 border">
                    <img class="card-image  cart" :src="cart.image" alt="img">
                  </div>
                  <div class="col-md-3 align-items-center overflow-hidden">
                    <p class="h6 mb-0 line-clamp line-1">{{ cart.title }}</p>
                    <p class="line-clamp mb-0 line-1">{{ cart.description }}</p>
                  </div>
                  <div class="col-md-7">
                    <div class="row w-100">
                      <div class="col-md-5 mb-md-0 mb-2">
                        <div>Price <span class="fw-bold text-success">{{ cart.singlePrice }} $</span></div>
                        <div class="line-clamp line-1">TotalPrice <span class="fw-bold  text-success">{{ roundUp(cart.price, 2) }} $</span></div>
                      </div>
                      <div class="col-md-4  col-5 pe-0">
                               <b-form-input
                                   v-model="cart.count"
                                   type="number"
                                   @input="changed($event , cart.id)"
                                   class="h-100"
                                   :state="cart.state"
                                   min="1"
                                   placeholder="Count"
                                   invalid-feedback="This field is required"
                               ></b-form-input>
                      </div>
                      <div class="col-3">
                        <div class="d-flex justify-content-md-between justify-content-md-start w-100 h-100">
                          <router-link exact v-bind:to="'product/' +cart.id">
                            <b-button  v-b-tooltip.hover title="View details" class="me-2 h-100" variant="outline-primary" ref="button">
                              <b-icon icon="eye-fill" aria-hidden="true"></b-icon>
                            </b-button>
                          </router-link>

                          <b-button class="h-100" v-b-tooltip.hover title="Delete" :id="'popover-reactive-'+cart.id" variant="outline-danger"
                                    ref="button">
                            <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                          </b-button>
                        </div>
                      </div>
                      <b-popover
                          :target="'popover-reactive-'+cart.id"
                          triggers="click"
                          :show.sync="cart.popover"
                          placement="bottom-left"
                          ref="popover"
                      >
                        <div>
                          <p>Are you sure for delete ?</p>
                          <div class="d-flex w-100 justify-content-end">
                            <b-button class="me-2" @click="onClose(cart)" size="sm" variant="outline-danger">Cancel</b-button>
                            <b-button @click="onOk(key)" size="sm" variant="outline-primary">Ok</b-button>
                          </div>
                        </div>
                      </b-popover>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 animated fadeInRight">
        <div class="bg-white rounded p-3 shadow mb-3">
          <div class="text-center fw-bold w-100">
            CheckOut
          </div>
          <div class="w-100 mt-4">
            <b-list-group>
              <b-list-group-item>
                <span class="d-flex justify-content-between">
                    <strong>Total: </strong>
                    <span>{{ price }} $</span>
                </span>
              </b-list-group-item>
              <b-list-group-item>
                <span class="d-flex justify-content-between">
                    <strong>Count: </strong>
                    <span>{{count}}</span>
                </span>
              </b-list-group-item>
            </b-list-group>
            <Button v-if="carts.length"  v-b-tooltip.hover  id="popover-reactive-clear" class="btn w-100 mt-3 shadow animated fadeIn fw-bold btn-outline-danger">
              <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
              Clear all
            </Button>
            <router-link
                v-if="count"
                tag="li"
                to="payment"
                class="w-100 btn mt-3 shadow btn-outline-warning text-dark fw-bold animated fadeIn"
            >
              Payment
              <b-icon icon="arrow-right" aria-hidden="true"></b-icon>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <b-popover
        target="popover-reactive-clear"
        triggers="click"
        :show.sync="popoverShow"
        placement="bottom"
        ref="popover"
    >
      <div>
        <p>Are you sure for clear ?</p>
        <div class="d-flex w-100 justify-content-end">
          <b-button class="me-2" @click="onClose()" size="sm" variant="outline-danger">Cancel</b-button>
          <b-button @click="onOk()" size="sm" variant="outline-primary">Ok</b-button>
        </div>
      </div>
    </b-popover>

  </div>
</template>

<script>

export default {
  name: "Checkout",
  data() {
    return {
      popoverShow: false,
      carts: [],
      count:null,
      price:null
    }
  },
  beforeMount() {
    let arr = JSON.parse(localStorage.getItem('cart'))
    if (!arr) {localStorage.setItem('cart', JSON.stringify([]))}
    this.setBasket(arr)
  },
  methods: {
    onClose(cart) {
     cart ?  cart['popover'] = false :  this.popoverShow = false
    },
    onOk(key){
      let arr = this.carts
      arr.splice(key, 1)
      this.setBasket((key || key === 0) ? arr : [])
    },
    setBasket(arr){
      this.carts = arr
      localStorage.setItem('cart', JSON.stringify(arr))
      this.getRightDataCommon(arr)
    },
    changed(e, id){
      let arr = this.carts
      let edited = arr.find(d=>{return d.id === id})
      edited['count'] = e ? parseInt(e) : 0
      edited['price'] = e*edited.singlePrice
      edited['state'] = !!e
      this.setBasket(arr)
    },
    getRightData(arr , key , round){
      let numb = 0
      arr.length > 0 && arr.forEach((s)=>{numb += s[key]})
      this[key] = round ? this.roundUp(numb ,3)  : numb
      localStorage.setItem(key , round ? this.roundUp(numb ,3)  : numb);
      !round ? this.$store.state.count = numb : null
    },
    getRightDataCommon(arr){
      this.getRightData(arr , 'count' , false)
      this.getRightData(arr , 'price' , true)
    },
    roundUp(num, precision) {
      precision = Math.pow(10, precision)
      return Math.ceil(num * precision) / precision
    },
  }
}
</script>

<style scoped>

</style>