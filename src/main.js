import { createApp } from 'vue'
import App from './App.vue'

// libraries
import Popper from "vue3-popper";
import { vfmPlugin } from 'vue-final-modal'
import VModal from './components/VModal.vue'
import SimpleModal from './components/SimpleModal.vue'
import AOS from 'aos';
// import VueGtag from "vue-gtag-next";

//vue ecosystem
import router from './router'
import store from './store'

//styles
import './index.css'
import 'aos/dist/aos.css';

AOS.init();

const app = createApp(App);

app.use(router)
.use(vfmPlugin)
// .use(VueGtag, {
//     property: {
//         id: "UA-123456-7"
//     }
// })
.use(store);

app.component("Popper", Popper);
app.component("Modal", SimpleModal);
app.component("VModal", VModal);

app.config.globalProperties.$filters = {
    readableName(text) {
        if (text) {
            let result = text.replace(/([A-Z])/g, " $1");
            return result.charAt(0).toUpperCase() + result.slice(1);
        }
        return text
    }
  }

app.mount('#app');
