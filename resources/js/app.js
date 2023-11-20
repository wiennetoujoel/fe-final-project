
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



import ExampleComponent from './components/ExampleComponent.vue';
app.component('example-component', ExampleComponent);

import Products from './components/Products.vue';
app.component('products-component', Products);

import Cart from './components/Cart.vue';
app.component('cart-component', Cart);

import NotFound from './components/NotFoundComponent.vue';
app.component ('not-found', NotFound);

import Home from './components/Home.vue';
app.component ('home', Home);

import Detail from './components/3rdPartyDetail.vue';
app.component('instruction', Detail)

import Navbar from './components/Navbar.vue';
app.component('navbar', Navbar)

import Sidebar from './components/Navbar.vue';
app.component('sidebar', Sidebar)





app.use(router).use(store).
component('font-awesome-icon', FontAwesomeIcon).
mount('#app');
