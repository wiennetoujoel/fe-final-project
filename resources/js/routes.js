import Cart from './components/Cart.vue'
import Products from './components/Products.vue'
import NotFound from './components/NotFoundComponent.vue'
import ExampleComponent from './components/ExampleComponent.vue'
import Home from './components/Home.vue'
import Detail from './components/3rdPartyDetail.vue'

const routes =[
    {
        path: '/cart',
        name : "cart",
        component : Cart
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound
    },
    {
        path : '/products',
        name : "products",
        component: Products
    },
    {
        path:'/example',
        name : "example",
        component : ExampleComponent
    },
    {
        path : '/',
        name : 'home',
        component : Home
    },
    {
        path : '/detail',
        name : 'detail',
        component : Detail
    }
]

export default routes