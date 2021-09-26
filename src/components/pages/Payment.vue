<template>
  <div class="container animated fadeIn mt-5">
    <div class="row">
      <div class="col-12 p-5 shadow rounded bg-white">
        <h3 class="mb-4 fw-bold">Payment</h3>
        <div :class="!parseInt(count) ? 'alert alert-danger' : 'alert alert-success' " role="alert">
          <div v-if="!parseInt(count)">
            You have not a product(s) in basket (or have not a count) please add from
            <router-link tag="a" class="text-decoration-none fw-bold" exact to="/" >Products</router-link> or
            <router-link tag="a" class="text-decoration-none fw-bold" exact to="/checkout" >Checkout</router-link>
          </div>
          <div v-if="parseInt(count)">
            You have {{count}} products and its costs {{price}}$
          </div>
        </div>
        <div class="mt-5" id="payment">
          <div class="row mb-3 ">
            <div class="col-xl-5">
              <div class="d-flex justify-content-xl-start justify-content-center">
                <vue-c-card
                    class="animated  flipInY"
                    :number="cc.number"
                    :holder="cc.holder"
                    :exp="cc.exp"
                    :cvc="cc.cvc"
                    :is-typing-cvc="isTypingCvc"/>
              </div>
            </div>
            <div class="col-xl-7 animated slideInUp">
              <b-form @submit="onSubmit">
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group>
                      <b-form-input
                          v-model="cc.number"
                          ref="number"
                          class="mb-3 shadow-sm"
                          type="text"
                          :state="error.number"
                          placeholder="Number"
                          v-mask="'#### #### #### ####'"
                      />
                    </b-form-group>
                  </div>

                  <div class="col-md-6">
                    <b-form-group>
                      <b-form-input
                          v-model="cc.cvc"
                          @focus="isTypingCvc = true"
                          @blur="isTypingCvc = false"
                          id="cvc"
                          class="mb-3 shadow-sm"
                          type="text"
                          ref="cvc"
                          :state="error.cvc"
                          v-mask="'###'"
                          placeholder="CVC"
                      />
                    </b-form-group>
                  </div>
                  <div class="col-md-12">
                    <b-form-group>
                      <b-form-input
                          v-model="cc.holder"
                          ref="holder"
                          class="mb-3 shadow-sm"
                          type="text"
                          :state="error.holder"
                          placeholder="Surname,Name"
                      />
                    </b-form-group>
                  </div>
                  <div class="col-md-12">
                    <b-form-datepicker
                        placeholder="Choose a date"
                        class="mb-3 shadow-sm"
                        menu-class="w-100"
                        calendar-width="100%"
                        selected-variant="success"
                        :reset-button="true"
                        reset-value="''"
                        reset-button-variant="success"
                        nav-button-variant="success"
                        :date-format-options="{ year: '2-digit', month: '2-digit', day: undefined }"
                        locale="en"
                        ref="exp"
                        :state="error.exp"
                        v-mask="'##/##'"
                        @input="dateDisabled($event)"
                    ></b-form-datepicker>
                  </div>

                  <div class="col-12">
                    <button ref="button" type="submit" class="btn w-100 btn-success">Pay</button>
                  </div>
                </div>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCCard from 'vue-ccard';
import {mask} from 'vue-the-mask'
import moment from 'moment'
import {notifications} from "@/utils/notification";

export default {
  notifications,
  directives: {mask},
  name: 'payment',
  components: {
    VueCCard,
  },
  data() {
    return {
      isTypingCvc: false,
      disabled: true,
      cc: {
        number: '',
        holder: '',
        exp: '',
        cvc: '',
      },
      error: {
        number: null,
        holder: null,
        exp: null,
        cvc: null,
      },
      res: 0,
      count:undefined,
      price:undefined
    };
  },
  mounted() {
   this.focusRef(this.$refs.number)
  },
  beforeMount() {
    this.count = localStorage.getItem('count');
    this.price = localStorage.getItem('price');
  },
  methods: {
    dateDisabled(e) {
      this.cc.exp = moment(e).format('MM/YY')
    },
    focusRef(ref) {
      this.$nextTick(() => {
        this.$nextTick(() => {
          (ref.$el || ref).focus()
        })
      })
    },
    validate() {
      this.res = 0
      let arr = Object.keys(this.error)
      arr.forEach((a) => {
        if (!this.error[a]) {
          this.res = this.res + 1
          this.error[a] = false
        }
      })
      return this.res === 0
    },
    onSubmit(e) {
      e.preventDefault()
      console.log(this.count)
      if (this.validate() && parseInt(this.count)) {
        this.showSuccessMsg({message: 'Payment done successfully !'})
        this.$router.push(`/`)
      }
      else {
        this.showErrorMsg({message: !parseInt(this.count) ? 'You must add products !!' : 'All inputs must be valid !!'})
      }
    }
  },
  watch: {
    "cc.number"(val) {
      this.error.number = (!!val && val.length >= 19)
      this.error.number && this.focusRef(this.$refs.cvc)
    },
    "cc.holder"(val) {
      this.error.holder = !!val
    },
    "cc.exp"(val) {
      this.error.exp = !!val
    },
    "cc.cvc"(val) {
      this.error.cvc = (!!val && val.length >= 3)
      this.error.cvc && this.focusRef(this.$refs.holder)
    },
  },
};
</script>