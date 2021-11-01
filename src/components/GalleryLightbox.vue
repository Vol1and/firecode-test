<template>
  <transition name="modal">
    <div class="modal-container" @click.self="$emit('close', null)">
      <div class="modal-container__close-btn" @click="$emit('close', null)">X</div>
      <img class="modal-container__image" :src="imageData.url"/>
      <div class="modal-container__description">{{ imageData.description }}</div>
    </div>
  </transition>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {MyImageData} from '../interfaces';

@Component
export default class GalleryLightbox extends Vue {
  @Prop({
      type: Object,
      required: true,
  }) readonly imageData!: MyImageData
}
</script>

<style lang="sass" scoped>
.modal-container
  position: fixed
  z-index: 999
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  transition: opacity 0.3s ease

  &__image
    border: white solid 5px
    vertical-align: middle

  &__description
    font-size: 25px
    color: white
    font-weight: bold
    horiz-align: center

  &__close-btn
    margin: 3% 49% auto
    vertical-align: top
    color: white
    font-size: 50px
    cursor: pointer
    width: 25px
    horiz-align: center


</style>
