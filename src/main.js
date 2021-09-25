import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import {routes} from "./routes";
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'izitoast/dist/css/iziToast.min.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import './assets/css/animate.css'
import './assets/css/main.css'
import VueTheMask from 'vue-the-mask'
import VueNotifications from 'vue-notifications'
import {options} from "@/utils/notification";

Vue.use(VueTheMask)
Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueNotifications, options)

const router = new VueRouter({
    mode: "history",
    routes
})


new Vue({
    el: '#app',
    router,
    render: h => h(App),
}).$mount('#app')
