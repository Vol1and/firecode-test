<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Таблица с галереей</h1>
    <div v-for="image in images" :key="image.url" style="display: inline">
      <img :src="image.url">
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {mapGetters} from 'vuex';
@Component({
    computed: {
        ...mapGetters({
            images: 'images',
        }),
    },
})
export default class Gallery extends Vue {}
</script>
