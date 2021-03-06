import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;


const initApp = () => {
    new Vue({
        router,
        store,
        render: (h) => h(App),
    }).$mount('#app');
};

store.dispatch('restoreGalleryFromJSON').finally(() => initApp());
