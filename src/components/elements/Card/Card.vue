<template>
  <div class="card animated zoomIn shadow  mb-4">
    <img v-bind:src="imgurl" class="card-img-top card-image" alt="...">
    <div class="card-body">
      <div class="fw-bold my-3">
        <b-form-rating variant="warning" v-model="rating" readonly></b-form-rating>
      </div>
      <h5 class="card-title line-clamp line-1">{{ title }}</h5>
      <p class="card-text line-clamp line-1">{{ description }}</p>
      <div class="w-100">
        <div class="fw-bold mt-2">Price: {{ price }}$</div>
        <div class="d-flex mt-3 justify-content-between">
          <Add :post="post"/>
          <router-link exact v-bind:to="'product/' +id">
            <b-button v-b-tooltip.hover title="View details" class="me-2" variant="outline-primary" ref="button">
              <b-icon icon="eye-fill" aria-hidden="true"></b-icon>
            </b-button>
          </router-link>
          <router-link exact v-bind:to="'product/' +id + '/edit'">
            <b-button v-b-tooltip.hover title="Edit" class="me-2" variant="outline-success" ref="button">
              <b-icon icon="pen-fill" aria-hidden="true"></b-icon>
            </b-button>
          </router-link>
          <Delete :id="id" />
        </div>
      </div>
    </div>




  </div>
</template>


<script>
import Add from "@/components/elements/AddCartButton/Add";
import Delete from "@/components/elements/DeleteButton/Delete";
export default {
  name: "Card",
  props: ['title', 'description', 'imgurl', 'price', 'category', 'id', 'rating' , 'post'],
  components:{
    Add,
    Delete
  },
}
</script>

