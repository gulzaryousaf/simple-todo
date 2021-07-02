import { createApp } from 'vue'
import App from './App.vue'
import store from '../store'
import router from './router'
import Toaster from '@meforma/vue-toaster';
import './index.css'

createApp(App)
.use(router)
.use(store)
.use(Toaster)
.mount('#app')
