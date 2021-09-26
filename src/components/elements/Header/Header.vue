<template>
  <div class="container-fluid animated">
    <div class="row">
      <b-navbar class="position-fixed animated slideInDown z-index" toggleable="lg" type="dark" variant="dark">
        <div class="container py-2">
          <b-navbar-brand>
            <router-link tag="span" exact to="/">
              <img class="logo" src="../../../assets/img/logo.png" alt="">
            </router-link>
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <router-link
                  tag="li"
                  class="nav-item"
                  active-class="active"
                  exact
                  to="/">
                <a class="nav-link">Product List</a>
              </router-link>
              <router-link
                  tag="li"
                  class="nav-item"
                  active-class="active"
                  exact
                  to="/product/create">
                <a class="nav-link">Add product</a>
              </router-link>
              <router-link
                  tag="li"
                  class="nav-item"
                  active-class="active"
                  exact
                  to="/checkout">
                <a class="nav-link">Checkout <span class="text-warning">{{count}}</span> </a>
              </router-link>
              <router-link
                  tag="li"
                  class="nav-item"
                  active-class="active"
                  exact
                  to="/payment">
                <a class="nav-link">Payment</a>
              </router-link>
            </b-navbar-nav>
          </b-collapse>
        </div>
      </b-navbar>
      <div class="headImage animated fadeIn px-0">
        <img src="https://picsum.photos/1000/200" alt="">
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "Header",
    computed:{
      count(){
        return this.$store.state.count
      }
    },
    created() {
      this.$store.state.count = localStorage.getItem("count")
    }
  }
</script>