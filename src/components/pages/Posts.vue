<template>
  <div>
    <div class="container animated slideInUp mt-5">
      <div class="row">
        <div class="col-12 mb-3">
          <div class="text-center h3 fw-bold">Products</div>
        </div>
        <div class="col-12">
          <div class="input-group animated fadeIn shadow mb-3">
            <input v-model="searchText" type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2">
          </div>
        </div>
        <div v-if="loading" class="col-12 mt-5 d-flex justify-content-center">  <b-spinner variant="success" type="grow" ></b-spinner></div>
        <div :key="key"  v-for="(post, key) in filtered"  class="col-xl-3 col-md-6 col-12">
          <Card
            v-if="!loading"
            :id="post.id"
            :post="post"
            :title="post.title"
            :description="post.description"
            :imgurl="post.image"
            :price="post.price"
            :category="post.category"
            :rating="post.rating.rate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/elements/Card/Card";
import * as Https from '@/services/http-service'
import {notifications} from "@/utils/notification";
import {aRoutes} from "@/services/api-routes";
export default {
  name: "Posts",
  notifications,
  data(){
    return {
      loading:true,
      postList : [],
      searchText:''
    }
  },
  components:{
    Card
  },
  computed:{
    filtered(){
     if (this.searchText.length > 0){
       let data = this.postList.filter((el)=>{
         if (el.title.toLowerCase().includes(this.searchText.toLowerCase()) || el.description.toLowerCase().includes(this.searchText.toLowerCase()) ) {
           return true
         }
       })
      return data
     }
     else {
       return this.postList
     }
    }
  },
  created(){
    Https.getRequest(`/${aRoutes.products}`)
        .then(response => {
          let data = response.data;
          this.loading = false;
          this.postList = data
        })
        .catch(e => console.log(e))
  }
}
</script>

