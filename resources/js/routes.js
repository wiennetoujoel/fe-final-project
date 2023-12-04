import NotFound from './components/NotFoundComponent.vue'
import Home from './components/Home.vue'
import Detail from './components/Detail.vue'
import Create from './components/Create.vue'
import LandingPage from './components/LandingPage'

const routes =[
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound
    },
    {
        path : '/home',
        name : 'home',
        component : Home
    },
    {
        path : '/detail/:id',
        name : 'detail',
        component : Detail,
        props : true
    },
    {
        path : '/create',
        name : 'create',
        component : Create
    },

    {
        path : '/',
        name : 'welcome',
        component : LandingPage
    }
]

export default routes