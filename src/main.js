import { createApp } from 'vue'
import App from './App.vue'
import router from './routes';
import 'normalize.css'
const app = createApp(App);

app.use(router)
// app.use(
//     Button
// )
app.mount('#app')
