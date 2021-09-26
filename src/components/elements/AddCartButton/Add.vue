<template>
  <b-button @click="addToCart" v-b-tooltip.hover title="Add to cart" class="me-2" variant="outline-success" ref="button">
    <b-icon icon="cart-fill" aria-hidden="true"></b-icon>
  </b-button>
</template>

<script>
import {notifications} from "@/utils/notification";

export default {
  notifications,
  name: "Add",
  props: ['post'],
  data() {
    return {
      data:{}
    }
  },
  methods:{
    roundUp(num, precision) {
      precision = Math.pow(10, precision)
      return Math.ceil(num * precision) / precision
    },
    addToCart(){
      let count = + localStorage.getItem('count')
      let price = + localStorage.getItem('price')
      console.log(price)
      count ++
      localStorage.setItem('count', count)
      this.$store.state.count = count
      let arr = JSON.parse(localStorage.getItem('cart'))
      if (arr){
        let obj = {...this.post}
        if (arr.some(item => item.id === obj.id)) {
          let duplicated = arr.find(d => d.id === obj.id)
          duplicated['price'] = +duplicated.price + obj.price
          duplicated['count'] = ++duplicated['count']
          price = price + duplicated['singlePrice']
        } else {
          arr.push(obj)
          obj['count'] = 1
          obj['popover'] = false
          obj['state'] = true
          obj['singlePrice'] = obj.price
          price = price + obj['price']
        }
        console.log(price)
        localStorage.setItem('price', this.roundUp(price , 3))
        localStorage.setItem('cart', JSON.stringify(arr))
        this.showSuccessMsg({message: 'Added to cart !'})
      }
    }
  },
  created() {
    console.log(this.post);
  },
}
</script>

