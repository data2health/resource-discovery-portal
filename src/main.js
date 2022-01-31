import { createApp } from 'vue'
import App from './App.vue'

// libraries
import Popper from "vue3-popper";
import { vfmPlugin } from 'vue-final-modal'
import VModal from './components/VModal.vue'
import Toaster from "@meforma/vue-toaster";
import SimpleModal from './components/SimpleModal.vue'
import Pill from './components/Pill.vue'
import CopyButton from './components/CopyButton.vue'
import AOS from 'aos';
import moment from 'moment';
import VueCookies from 'vue3-cookies'
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
.use(Toaster)
// .use(VueGtag, {
//     property: {
//         id: "UA-123456-7"
//     }
// })
.use(store)
.use(VueCookies, {
    expireTimes: "7d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None"
});
// this.$cookies.set('theme','default');

app.component("Popper", Popper);
app.component("Modal", SimpleModal);
app.component("VModal", VModal);
app.component("Pill", Pill);
app.component("CopyButton", CopyButton);

app.config.globalProperties.$filters = {
    readableName(text) {
        if (text) {
            let result = text.replace(/([A-Z])/g, " $1");
            return result.charAt(0).toUpperCase() + result.slice(1);
        }
        return text
    },
    formatDate(ts) {
        if (ts) {
            return moment(ts).format("MMM DD, YYYY");
        }
        return ts
    },
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

app.mount('#app');
