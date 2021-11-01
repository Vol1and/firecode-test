<template>
<div @mouseover="isTobarVisible = true" @mouseleave="isTobarVisible = false" class="image-container">
  <div :style="{opacity: isTobarVisible ? 100: 0}" class="image-container__image-topbar image-topbar">
    <div class="image-topbar__description">{{imageData.description}}</div>
    <img class="image-topbar__delete-icon" @click="deleteImage" src="../assets/delete-icon.svg" />
  </div>
  <img class="image-container__image" :src="imageData.url" />
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


  deleteImage() {
      this.deleteImageFromGallery(this.imageData);
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

.image-topbar
  &__delete-icon
    width: 30px
    height: 30px
    float: right
    color: red
  &__description
    float: left

</style>
