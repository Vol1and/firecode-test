<template>
  <div class="home">
    <div class="gallery-container">
      <div class="gallery-row" v-for="(columnArr, index) in imagesToColumnArr" :key="index">
        <GalleryPhoto @imageClicked="toggleLightbox" v-for="image in columnArr" :key="image.url" :image-data="image"/>
      </div>
    </div>
    <GalleryLightbox @close="toggleLightbox" :image-data="passedImageToLightbox" v-if="passedImageToLightbox" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {mapGetters} from 'vuex';
import GalleryPhoto from '@/components/GalleryPhoto.vue';
import {MyImageData} from '@/interfaces';
import GalleryLightbox from '@/components/GalleryLightbox.vue';
@Component({
    components: {
        GalleryLightbox,
        GalleryPhoto},
    computed: {
        ...mapGetters({
            images: 'images',
        }),
    },
})
export default class Gallery extends Vue {
  protected images!: Array<MyImageData>;

  private passedImageToLightbox: MyImageData | null = null;
  private windowWidth = window.innerWidth;


  get rowColumn() {
      return 5 < Math.floor(this.windowWidth / 320) ? 5: Math.floor(this.windowWidth / 320);
  }

  toggleLightbox(data: MyImageData | null) {
      this.passedImageToLightbox = data;
  }

  get imagesToColumnArr(): Array<Array<MyImageData>> {
      const arr: Array<Array<MyImageData>> = [];
      let columnSize = Math.round(this.images.length / this.rowColumn );
      // First if - if column size is not enough to place all images in array in all columns
      // Second if - if we add one more image to each column, we need to make sure there still be images in last column
      // (there is some cases when all images go to first columns, and last column is empty)
      if (this.rowColumn * columnSize < this.images.length
          && 0 < this.rowColumn * columnSize + 1 - this.images.length) columnSize++;

      for (let i = 0; i < this.rowColumn; i++) {
          arr.push(this.images.slice(i * columnSize, (i + 1) * columnSize));
      }

      // if there is any available images, we add them in last column
      if (this.rowColumn * columnSize < this.images.length) {
          arr[arr.length - 1].push(...this.images.slice(this.rowColumn * columnSize, this.images.length));
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
