import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from "@/views/AboutView.vue";
import ListingDetailView from "@/views/ListingDetailsView.vue";
import MyListingView from "@/views/MyListingView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {title: 'Houses'}
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
            meta: {title: 'About'}
        },
        {
            path: '/house/create',
            name: 'create',
            component: MyListingView,
            meta: {title: 'Create new listing'}
        },
        {
            path: '/house/edit/:id',
            name: 'edit',
            component: MyListingView,
            props: true,
            meta: {title: 'Edit listing'}
        },
        {
            path: '/house/:id',
            name: 'house',
            component: ListingDetailView,
            props: true,
            meta: {title: 'House'}

        },
        {
            path: '/:catchAll(.*)',
            redirect: '/'
        }
    ]
})

export default router
