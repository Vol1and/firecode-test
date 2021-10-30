import Vue from 'vue';
import Vuex from 'vuex';
import {MyImageData} from '@/interfaces';

Vue.use(Vuex);

export interface MainState {
    images: Array<MyImageData>
}

export default new Vuex.Store<MainState>({
    state: {
        images: [],
    },
    mutations: {
        updateImages(state, payload) {
            state.images = payload;
        },
    },
    actions: {
        updateImagesFromJSON({commit}, payload) {
            localStorage.setItem('savedGallery', JSON.stringify(payload));
            commit('updateImages', payload);
        },
        restoreImagesFromJSON({commit}) {
            return new Promise((resolve) => {
                const imgs = localStorage.getItem('savedGallery');
                if (imgs) {
                    commit('updateImages', JSON.parse(imgs));
                }
                resolve(null);
            });
        },
    },
    getters: {
        images(state) : Array<MyImageData> {
            return state.images;
        },
    },
});
