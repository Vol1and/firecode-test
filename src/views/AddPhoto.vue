<template>
  <div class="home">
    <h1>Добавляем фото</h1>
    <div
        @drop="drop"
        @dragover="dragover"
        @dragleave="dragleave"
        class="main-table"
    >
      <input
          style="opacity: 0"
          type="file"
          ref="file"
          accept=".tsv"
      />
      {{images}}
    </div>
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
            updateImagesFromJSON: 'updateImagesFromJSON',
        }),
    },
})
export default class AddPhoto extends Vue {
    private jsonFileData = '';
  @Ref('file') readonly file!: any;

  protected images!: Array<MyImageData>;
  protected updateImagesFromJSON!: (payload: Array<MyImageData>) => any;

  @Watch('jsonFileData')
  private onJsonFileDataChanged(newData: string): void {
      const parsedData = JSON.parse(newData);
      if (parsedData.images) {
          this.updateImagesFromJSON(parsedData.images);
      }
  }

  dragover(event: Event) {
      console.log('Дрегаем');
      event.preventDefault();

      if (!event.currentTarget.classList.contains('bg-green-300')) {
          event.currentTarget.classList.remove('bg-gray-100');
          event.currentTarget.classList.add('bg-green-300');
      }
  }
  dragleave(event: Event) {
      console.log('Уводим');
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
  }
  async drop(event: DragEvent) {
      event.preventDefault();
      if (null == event.dataTransfer) return;
      this.file.files = event.dataTransfer.files;

      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
          this.jsonFileData = e.target.result;
      };

      reader.readAsText( event.dataTransfer.files[0]);
  }
}
</script>
<style>
.main-table {
  width: 75%;
  margin-left: 12.5%;
  border: 1px black solid;
  height: 500px;
}
.bg-green-300 {
  background: green;
}
.bg-gray-100 {

  background: gray;
}

</style>
