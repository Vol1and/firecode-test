import {RouteConfig} from 'vue-router';
import Gallery from '@/views/Gallery.vue';
import AddPhoto from '@/views/AddPhoto.vue';

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'Gallery',
        component: Gallery,
    },
    {
        path: '/add',
        name: 'AddPhoto',
        component: AddPhoto,
    },
];

export default routes;
