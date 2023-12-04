
import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';





import store from './store'     
import routes from './routes'


library.add(fas, fab, far);

const app = createApp({});  
console.log(`isi dari routes adalah ${routes}`)
const router = createRouter({
    history:createWebHistory(),
    routes
})

import LandingPage from './components/LandingPage.vue';
app.component('landing-page', LandingPage)

import NotFound from './components/NotFoundComponent.vue';
app.component ('not-found', NotFound);

import Home from './components/Home.vue';
app.component ('home', Home);

import Detail from './components/Detail.vue';
app.component('detail', Detail)

import Navbar from './components/Navbar.vue';
app.component('navbar', Navbar)

import Sidebar from './components/Navbar.vue';
app.component('sidebar', Sidebar)

import PopUpTerminate from './components/PopUpTerminate.vue';
app.component('popupTerminate', PopUpTerminate)

import PopUpNote from './components/PopUpNote.vue';
app.component('popupNote', PopUpNote)

import PopUpVendor from './components/PopUpVendor.vue';
app.component('popupVendor', PopUpVendor)

import PopUpDeleteVendor from './components/PopUpDeleteVendor.vue';
app.component('popUpDeleteVendor', PopUpDeleteVendor)



app.use(router).use(store).
component('font-awesome-icon', FontAwesomeIcon).
mount('#app');
