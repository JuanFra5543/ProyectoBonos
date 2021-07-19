import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

//usar axios 
import axios from 'axios';
import VueAxios from 'vue-axios';



createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')

axios.defaults.baseURL = 'http://localhost:5000/api'