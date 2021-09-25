<template>
  <span>
     <b-button v-b-tooltip.hover title="Delete" :id="'popover-reactive-'+ id" variant="outline-danger"
               ref="button">
       <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
    </b-button>
    <b-popover
      :target="'popover-reactive-'+id"
      triggers="click"
      :show.sync="popoverShow"
      placement="bottom"
      container="my-container"
      ref="popover"
  >
    <div>
      <p>Are you sure for deleting ?</p>
      <div class="d-flex w-100 justify-content-end">
        <b-button class="me-2" @click="onClose" size="sm" variant="outline-danger">Cancel</b-button>
        <b-button @click="onOk" size="sm" variant="outline-primary">Ok</b-button>
      </div>
    </div>
  </b-popover>
  </span>
</template>

<script>
import * as Https from "@/services/http-service";
import {notifications} from "@/utils/notification";

export default {
  notifications,
  name: "Delete",
  props: ['id'],
  data() {
    return {
      popoverShow: false
    }
  },
  methods: {
    onClose() {
      this.popoverShow = false
    },
    onOk() {
      this.onClose()
      Https.deleteRequest(`product/${this.id}`).then((res) => {
            console.log(res)
            this.showSuccessMsg()
      }
      ).catch((err) => {
        console.log(err)
        this.showErrorMsg()
      })
    },
  }

}
</script>

<style scoped>

</style>