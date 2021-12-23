import { createApp } from 'vue'
import App from './App.vue'
import router from './routes';
import 'normalize.css'
import { Button, Skeleton } from "vant";
const app = createApp(App);

router.beforeEach((to, from, next) => {
   document.title = to.meta.title
   next()
})

app.use(router)
app.use(
    Button,
    Skeleton
)
app.mount('#app')
