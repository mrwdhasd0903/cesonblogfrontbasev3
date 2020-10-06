import "/src/assets/css/base.css";
import "/src/assets/css/me.css";
import "/src/assets/css/background.css";


import { createApp } from 'vue'
import App from './App.vue'
import router from '/src/router/index.js';


const app = createApp(App)
app.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
app.use(router)
app.mount('#app')
