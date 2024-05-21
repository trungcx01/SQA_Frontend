import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/base.css'
import App from './App.vue'
import router from './router'
import Unicon from 'vue-unicons'
import vClickOutside from 'click-outside-vue3'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import {
  uniAngleLeftB,
  uniAngleRightB,
  uniSearch,
  uniAngleDown,
  uniCalendarAlt,
  uniArrowRight
} from 'vue-unicons/dist/icons'

const app = createApp(App)
const pinia = createPinia()
Unicon.add([uniAngleLeftB, uniAngleRightB, uniSearch, uniAngleDown, uniCalendarAlt, uniArrowRight])
app.use(ToastPlugin)
app.use(vClickOutside)
app.use(Unicon)
app.use(pinia)
app.use(router)

app.mount('#app')
