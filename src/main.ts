import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import axios from 'axios'



const app = createApp(App)
app.config.globalProperties.$http = axios
axios.defaults.baseURL = 'http://192.168.50.163:5000'
axios.defaults.timeout = 200
axios.defaults.headers.post['Content-Type'] = 'application/json'

app.use(router);
app.use(naive);
app.mount('#app');