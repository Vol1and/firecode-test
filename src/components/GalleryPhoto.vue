<template>
<div @mouseover="isTobarVisible = true" @mouseleave="isTobarVisible = false" class="image-container">
  <div :style="{opacity: isTobarVisible ? 100: 0}" class="image-container__image-topbar image-topbar">
    <div class="image-topbar__description">{{imageData.description}}</div>
    <img class="image-topbar__delete-icon" @click="deleteImage" src="../assets/delete-icon.svg" />
  </div>
  <img
      v-show="isLoaded"
      @load="onImgLoad"
      class="image-container__image"
      :src="imageData.url"
  />
  <div class="image-container__skeleton skeleton"  v-if="!isLoaded">
    <div class="skeleton__info">Loading, please wait...</div>
  </div>
</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {mapActions, mapGetters} from 'vuex';
import {MyImageData} from '@/interfaces';

@Component({
    computed: {
        ...mapGetters({
        }),
    },
    methods: {
        ...mapActions({
            deleteImageFromGallery: 'deleteImageFromGallery',
        }),
    },
})
export default class GalleryPhoto extends Vue {
  @Prop({type: Object, required: true}) readonly imageData!: MyImageData;

  protected deleteImageFromGallery!: (payload: MyImageData) => any;
  private isTobarVisible = false;
  private isLoaded = false;

  deleteImage() {
      this.deleteImageFromGallery(this.imageData);
  }
  onImgLoad() {
      this.isLoaded = true;
  }
}
</script>

<style lang="sass" scoped>
.image-container
    object-fit: cover
    &__image-topbar
      display: inline
    &__image
      object-fit: cover
      width: 100%
      height: 100%
      border-radius: 15px
    &__skeleton
      margin: 15px

.skeleton
  width: 100%
  height: 200px
  background: lightgray
  border-radius: 15px
  &__info
    font-size: 20px
    font-weight: bold
    position: relative
    margin: 0 auto
    top: 40%

.image-topbar
  &__delete-icon
    width: 30px
    height: 30px
    float: right
    color: red
  &__description
    float: left

</style>
