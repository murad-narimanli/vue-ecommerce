<template>
  <div>
    <div class="container animated slideInUp mt-5">
      <div class="row">
        <div v-if="loading" class="col-12 mt-5 d-flex justify-content-center">  <b-spinner variant="success"  type="grow" ></b-spinner></div>
      </div>
      <div v-if="!loading" class="card shadow   mb-3 w-100">
        <div class="row g-0">
          <div class="col-md-4">
            <img  v-bind:src="data.image"   class="w-100 p-5 card-img-top" >
          </div>
          <div class="col-md-8">
            <div class= "card-body">
              <h5 class="card-title ">{{data.title}}</h5>
              <p class="card-text ">{{data.description}}</p>
              <div class="w-100">
                <div class="fw-bold mt-2">Price: {{data.price}}$</div>
                <div class="d-flex mt-2">
                  <Add :post="data"/>
                  <router-link  exact v-bind:to="'/product/' +id + '/edit'">
                    <b-button  v-b-tooltip.hover title="Edit" class="me-2"  variant="outline-primary" ref="button">
                      <b-icon icon="pen-fill" aria-hidden="true"></b-icon>
                    </b-button>
                  </router-link>
                  <Delete :id="$route.params.id" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Https from "@/services/http-service";
import Delete from "@/components/elements/DeleteButton/Delete";
import Add from "@/components/elements/AddCartButton/Add";
import {aRoutes} from "@/services/api-routes";

export default {
  components:{
    Delete,
    Add
  },
  name: "FullPost",
  data() {
    return {
      loading:true,
      id: this.$route.params.id,
      data:{}
    }
  },
  methods:{
    getData(id){
      Https.getRequest( `/${aRoutes.products}/${id}`)
          .then(response => {
            let data = response.data;
            this.data = data;
            this.loading = false;
          })
      .catch(() => this.$router.push(`/`))
    },
  },
  created() {
    this.getData(this.$route.params.id)
  },

}
</script>

