import {RouteConfig} from 'vue-router';
import Home from '@/views/Home.vue';

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
];

export default routes;
