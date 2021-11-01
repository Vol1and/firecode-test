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
        addImageToGallery(state, payload) {
            state.images.push(payload);
        },
        updateGallery(state, payload) {
            state.images = payload;
        },
        deleteImageFromGallery(state, payload) {
            state.images.splice(state.images.indexOf(payload), 1);
        },
    },
    actions: {
        addImageToGallery({commit, state}, payload) {
            if (payload.url) {
                commit('addImageToGallery', payload);
                localStorage.setItem('savedGallery', JSON.stringify(state.images));
            }
        },
        updateGalleryFromJSON({commit}, payload) {
            localStorage.setItem('savedGallery', JSON.stringify(payload));
            commit('updateGallery', payload);
        },
        restoreGalleryFromJSON({commit}) {
            return new Promise((resolve) => {
                const imgs = localStorage.getItem('savedGallery');
                if (imgs) {
                    commit('updateGallery', JSON.parse(imgs));
                }
                resolve(null);
            });
        },
        deleteImageFromGallery({commit, state}, payload) {
            if (state.images.includes(payload)) {
                commit('deleteImageFromGallery', payload);
                localStorage.setItem('savedGallery', JSON.stringify(state.images));
            }
        },
    },
    getters: {
        images(state) : Array<MyImageData> {
            return state.images;
        },
    },
});
