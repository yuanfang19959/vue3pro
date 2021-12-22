import { createApp } from 'vue'
import App from './App.vue'
import router from './routes';
import 'normalize.css'
import { Button, Skeleton } from "vant";
const app = createApp(App);

app.use(router)
app.use(
    Button,
    Skeleton
)
app.mount('#app')
