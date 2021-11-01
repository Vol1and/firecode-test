<template>
  <div class="add-form-container">
    <div class="add-form-container__title">Добавить фото к галерее</div>
    <div class="add-form-container__image-input image-input">
      <input
          placeholder="Ссылка на изображение"
          type="text"
          class="image-input__image"
          v-model="formData.url"
      />
      <input
          placeholder="Описание изображения"
          type="text"
          class="image-input__description-input"
          v-model="formData.description"
      />
      <button :disabled="!formData.url" @click="addImage" class="image-input__submit-btn">Добавить изображение</button>
    </div>
    <div class="add-form-container__title">Загрузить галерею через json-файл</div>
    <div class="add-form-container__json-add json-add">
      <input
          type="file"
          ref="file"
          accept=".json"
          class="json-add__input"
          @change="readFile"
      />
      <div
          @drop="drop"
          @dragover="dragover"
          @dragleave="dragleave"
          class="json-add__drag-area drag-area"
      >
        <img class="drag-area__icon" src="../assets/drag-icon.png" />
        <p class="drag-area__description">Перенесите сюда свой json-файл</p>
      </div>
    </div>
    <p class="add-form-container__message">{{message}}</p>
  </div>
</template>

<script lang="ts">
import {Component, Ref, Vue, Watch} from 'vue-property-decorator';
import {mapActions, mapGetters} from 'vuex';
import {MyImageData} from '@/interfaces';
@Component({
    computed: {
        ...mapGetters({
            images: 'images',
        }),
    },
    methods: {
        ...mapActions({
            updateGalleryFromJSON: 'updateGalleryFromJSON',
            addImageToGallery: 'addImageToGallery',
        }),
    },
})
export default class AddPhoto extends Vue {
  protected images!: Array<MyImageData>;
  protected updateGalleryFromJSON!: (payload: Array<MyImageData>) => any;
  protected addImageToGallery!: (payload: MyImageData) => any;


  @Ref('file') readonly file!: any;
  @Watch('jsonFileData')
  private onJsonFileDataChanged(newData: string): void {
      try {
          const parsedData = JSON.parse(newData);
          if (parsedData.images) {
              this.updateGalleryFromJSON(parsedData.images);
              this.message = 'Файл прочитан успешно, галерея обновлена!';
          } else {
              this.file.value = null;
              this.message = 'Выбранный json-файл не содержит данных о галерее!';
          }
      } catch (e) {
          this.file.value = null;
          this.message = 'Ошибка при попытке чтения json-файла!';
      }
  }

  private jsonFileData = '';
  private formData : MyImageData = {description: '', url: ''};
  private message = '';

  addImage() {
      this.addImageToGallery(this.formData);
      this.message = 'Файл добавлен, проверьте галерею!';
      this.formData = {description: '', url: ''};
  }

  dragover(event: Event) {
      event.preventDefault();
      (event.currentTarget as HTMLDivElement).classList.add('bg-green');
  }
  dragleave(event: Event) {
      (event.currentTarget as HTMLDivElement).classList.remove('bg-green');
  }

  readFile() {
      if (!this.file.files) return;

      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
          this.jsonFileData = e.target.result;
      };

      reader.readAsText( this.file.files[0]);
  }

  async drop(event: DragEvent) {
      event.preventDefault();

      if (null == event.dataTransfer) return;
      this.file.files = event.dataTransfer.files;
      this.readFile();

      (event.currentTarget as HTMLDivElement).classList.remove('bg-green');
  }
}
</script>
<style lang="sass">

.add-form-container
  &__image-input
    margin-bottom: 30px
  &__title
    margin-bottom: 15px
    color: black
    font-size: 25px
  &__message


.json-add
  &__drag-area
    width: 33%
    margin-left: 33%
    margin-top: 10px
    border: 1px black solid
    height: 200px
    border-radius: 15px

.image-input
  display: flex
  justify-content: center
  &__image
    margin: 0 10px
    height: 30px
  &__description-input
    margin: 0 10px
    height: 30px
  &__submit-btn
    margin: 0 10px
    height: 34px

.drag-area
  &__icon
    width: 50px
    height: 50px
    position: relative
    top: 50%
    margin: 0 auto
  &__description
    color: gray
    margin: 0 auto
    position: relative

.bg-green
  background: lightgreen


</style>
