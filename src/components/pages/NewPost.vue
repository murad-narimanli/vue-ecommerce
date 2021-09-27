<template>
  <div class="container animated slideInUp mb-5">
    <div class="row">
      <div v-if="loading" class="col-12 mb-3 mt-5 d-flex justify-content-center">
        <b-spinner variant="success"  type="grow"></b-spinner>
      </div>
    </div>
    <div v-if="!loading" class="row bg-white rounded shadow p-4 mt-5">
      <div class="col-12 mb-3 ">
        <h3 class="fw-bold">
          {{ $route.params.id ? 'Edit Product' : 'Add Product' }}
        </h3>
      </div>
      <div class="col-md-4 mb-md-0 mb-3 border overflow-hidden p-5 col-12">
        <img v-if="form.image" v-bind:src="form.image" class="w-100 h-100" alt="...">
      </div>
      <div class="col-md-8 col-12">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group>
            <b-form-select
                id="popover-input-2"
                v-model="form.category"
                class="form-control mb-4"
                :state="error.categoryState"
                :options="options"
                size="sm"
            ></b-form-select>
          </b-form-group>
          <b-form-group>
            <b-form-input
                v-model="form.image"
                class="mb-4"
                type="text"
                :state="error.imgState"
                placeholder="Image url"
                invalid-feedback="This field is required"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
                v-model="form.title"
                class="mb-4"
                type="text"
                :state="error.titleState"
                placeholder="Title"
                invalid-feedback="This field is required"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
                v-model="form.description"
                class="mb-4"
                type="text"
                :state="error.descriptionState"
                placeholder="Description"
                invalid-feedback="This field is required"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
                v-model="form.price"
                class="mb-4"
                type="text"
                :state="error.priceState"
                placeholder="Price"
                invalid-feedback="This field is required"
            ></b-form-input>
          </b-form-group>
          <div class="d-flex justify-content-end">
            <button class="btn btn-primary" type="submit">Save</button>
            <router-link to="/">
              <button class="btn ms-2 btn-danger">Cancel</button>
            </router-link>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import * as Https from "@/services/http-service";
import {notifications} from "@/utils/notification";
import {mapMutations} from 'vuex'
export default {
  name: 'newPost',
  notifications,
  data() {
    return {
      loading: true,
      options: [{text: '- Category -', value: ''}],
      mainProps: {blank: true, blankColor: '#777', width: 75, height: 75, class: 'm1'},
      form: {
        title: '',
        category: '',
        description: '',
        price: null,
        image: '',
      },
      error: {
        titleState: null,
        categoryState: null,
        descriptionState: null,
        priceState: null,
        imgState: null,
      },
      res: null
    }
  },
  watch: {
    "form.title"(val) {
      this.error.titleState = !!val
    },
    "form.category"(val) {
      this.error.categoryState = !!val
    },
    "form.description"(val) {
      this.error.descriptionState = !!val
    },
    "form.price"(val) {
      this.error.priceState = !!val
    },
    "form.image"(val) {
      this.error.imgState = !!val
    },
  },
  methods: {
    ...mapMutations([
      "getProduct"
    ]),
    getCategories() {
      Https.getRequest(`/products/categories`).then((res) => {
        this.options = [...this.options, ...res.data]
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
    setForm(data){
      let arr = Object.keys(this.form)
      arr.forEach((a) => {
        this.form[a] = data[a]
      })
    },
    getData(id) {
      Https.getRequest(`/products/${id}`)
          .then(response => {
            let data = response.data;
            this.setForm(data)
            this.loading = false;
          })
          .catch(() => {
            this.getProduct(id)
            this.setForm(this.$store.state.product)
          })
    },
    onSubmit(event) {
      event.preventDefault()
      if (this.validate()) {
        if (this.$route.params.id) {
          console.log(this.$route.params.id)
          Https.putRequest(`/products/${this.$route.params.id}`, {
            ...this.form,
            price: parseInt(this.form.price)
          }).then(() => {
            this.showSuccessMsg({message: 'Product successfully updated !'})
            this.$router.push(`/`)
          }).catch(() => {
            this.showErrorMsg()
          })
        } else {
          Https.postRequest(`/products`, {...this.form, price: parseInt(this.form.price)}).then(() => {
            this.$router.push(`/`)
            this.showSuccessMsg({message: 'Product successfully created !'})
          }).catch(() => {
            this.showErrorMsg()
          })
        }
      }
    },
    onReset(event) {
      event.preventDefault()
      this.form.title = ''
      this.form.category = ''
      this.form.description = ''
      this.form.price = null
      this.form.image = ''
    }
  },
  beforeMount() {
    this.getCategories()
  },
  created() {
    console.log(this.$store.state)
    if (this.$route.params.id) {
      this.getData(this.$route.params.id)
    } else {
      this.loading = false
      this.onReset()
    }
  },
}
</script>
