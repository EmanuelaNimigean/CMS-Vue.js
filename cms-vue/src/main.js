import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import * as Vue from 'vue'

// Vue.prototype.moment = moment;

const app=createApp(App);
app.use(VueAxios, axios);
app.mount('#app');
