<template>
  <div class="home">
    <div class="gallery-container">
      <div class="gallery-row" v-for="(columnArr, index) in imagesToColumnArr" :key="index">
        <GalleryPhoto v-for="image in columnArr" :key="image.url" :image-data="image"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {mapGetters} from 'vuex';
import GalleryPhoto from '@/components/GalleryPhoto.vue';
import {MyImageData} from '@/interfaces';
@Component({
    components: {GalleryPhoto},
    computed: {
        ...mapGetters({
            images: 'images',
        }),
    },
})
export default class Gallery extends Vue {
  protected images!: Array<MyImageData>;

  private windowWidth = window.innerWidth;


  get rowColumn() {
      return 5 < Math.floor(this.windowWidth / 320) ? 5: Math.floor(this.windowWidth / 320);
  }


  get imagesToColumnArr(): Array<Array<MyImageData>> {
      const arr: Array<Array<MyImageData>> = [];
      let columnSize = Math.floor(this.images.length / this.rowColumn);
      if (this.rowColumn * columnSize < this.images.length) columnSize++;

      for (let i = 0; i < this.rowColumn; i++) {
          arr.push(this.images.slice(i * columnSize, (i + 1) * columnSize));
      }

      return arr;
  }

  mounted() {
      window.addEventListener('resize', () => {
          this.windowWidth = window.innerWidth;
      });
  }
}
</script>
<style lang="sass">
.gallery-container
  justify-content: space-around
  display: flex

.gallery-row
  padding: 15px
  width: 20%
@media screen and ( max-width: 1600px )
  .gallery-row
    padding: 15px
    width: 25%
@media screen and ( max-width: 1280px )
  .gallery-row
    padding: 15px
    width: 33%
@media screen and ( max-width: 960px )
  .gallery-row
    padding: 10px
    width: 50%
@media screen and ( max-width:  640px)
  .gallery-row
    padding: 10px
    width: 100%
@media screen and ( max-width:  320px)
  .gallery-row
    padding: 5px
    width: 100%

</style>
