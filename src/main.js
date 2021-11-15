import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/config'

// global styles
import './assets/main.css'

let app 
// fires when is changes to auth
projectAuth.onAuthStateChanged( () => {
    if(!app) {
        app = createApp(App).use(router).mount('#app')
    }
})


