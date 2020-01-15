<template>
  <div class="v-file">
    <div class="title">{{title}}</div>
    <div class="file-area">
      <div v-for="(file, index) in files" :key="index"
        class="file-item" :class="{loading: file.loading}" :style="style(file)"
        @click="previewFile(file)">
        <spinner v-if="file.loading" class="spinner" type="circles"></spinner>
        <template v-else>
          <img v-if="file.id" class="cancel-img" src="assets/cancel.png" @click.stop="removeFile(index)">
        </template>
      </div>
      <div class="upload-area">
        <template v-if="(files.length === 0 || multiple) && files.length < multipleCount">
          <div class="file-item" @click="addFile()">
            <i class="ion-md-add"></i>
            <span class="text">添加</span>
          </div>
        </template>
      </div>
    </div>
    <input ref="input" class="file-input" type="file" :accept="accept" :multiple="multiple" @change="selectFile($event)">
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'
import { isImageFile } from '../util'
import { Spinner } from '@/components/vux'
import { previewImage } from 'common/js/util'

export default {
  name: 'VFile',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  components: {
    Spinner
  },
  data() {
    return {
      files: []
    }
  },
  computed: {
    fileIds() {
      return this.files.filter(file => file.id).map(file => file.id)
    },
    fileUrls() {
      return this.files.filter(file => file.url).map(file => file.url)
    },
    isImageFile() {
      return isImageFile(this.field)
    },
    accept() {
      return this.isImageFile ? 'image/*' : ''
    },
    example() {
      return this.field['#thumb']
    },
    style() {
      return file => {
        if (!this.isImageFile) {
          return {}
        }
        const imageUrl = file.thumbnailUrl || this.example
        return !file.loading ? {
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundClip: 'padding-box',
          backgroundPosition: 'center'
        } : {}
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function(newValue) {
        let fileIds = []
        if (newValue instanceof Array) {
          fileIds = newValue
        } else if (newValue) {
          fileIds = [newValue]
        }
        if (fileIds.length > 0) {
          const filteredFileIds = fileIds.filter(id => !this.fileIds.includes(id))
          this.files = fileIds.map(id => {
            const loadingFile = this.findFileById(id)
            return loadingFile || {
              id: id,
              url: '',
              thumbnailUrl: '',
              loading: true
            }
          })
          filteredFileIds.length > 0 && this.fetchFilesByFileIds(filteredFileIds).then(({ data: { files = [] } }) => {
            files.forEach(file => {
              const loadedFile = this.findFileById(file['file_id'])
              if (loadedFile) {
                Object.assign(loadedFile, {
                  url: file['file_url'],
                  thumbnailUrl: file['thumbnail_url']
                })
              }
            })
          }).finally(() => this.files.forEach(file => file.loading = false))
        }
      }
    }
  },
  methods: {
    ...mapActions(['uploadFile', 'fetchFilesByFileIds']),
    addFile() {
      this.$refs['input'].click()
    },
    clearFile() {
      this.$refs['input'].value = ''
    },
    previewFile(file) {
      if (this.isImageFile) {
        previewImage(file.url, this.fileUrls)
      }
    },
    selectFile(event) {
      const files = event.target.files
      if (this.files.length + files.length > this.multipleCount) {
        this.$vux.toast.show({
          text: `最多可以选择${this.multipleCount}个文件`,
          time: 3000,
          type: 'text',
          width: 'auto',
          position: 'middle'
        })
        return false
      }
      // TODO 限制文件类型
      this.files = [...this.files, ...[...files].map(file => ({
        id: '',
        url: '',
        thumbnailUrl: '',
        file,
        loading: false
      }))]
      this.$emit('files-change', this.files)
      this.upload()
    },
    upload() {
      const requests = this.files.map(file => {
        if (!file.id && file.file) {
          file.loading = true
          const formData = new FormData()
          formData.append('file', file.file)
          return this.uploadFile(formData).then(response => {
            Object.assign(file, {
              id: response.data['file_id'],
              url: response.data['file_url'],
              thumbnailUrl: response.data['thumbnail_url']
            })
            this.$emit('uploaded', file.id)
            return file
          }).finally(() => file.loading = false)
        }
        return Promise.resolve(file)
      })
      Promise.all(requests).finally(() => this.emitValue())
    },
    removeFile(index) {
      this.files.splice(index, 1)
      this.emitValue()
    },
    emitValue() {
      this.$emit('input', this.multiple ? this.fileIds : this.fileIds[0])
      this.clearFile()
    },
    findFileById(id) {
      return this.files.find(file => file.id === id)
    }
  }
}
</script>

<style lang="less" scoped>
.v-file {
  .title {
    font-size: @fontSizeMd;
    color: @colorTitleText;
    height: @fieldHeight;
    line-height: @fieldHeight;
    padding: @cellPaddingTotal;
  }
  .file-area {
    .flex-box-row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: @cellPaddingTotal;
  }
  .file-item {
    .flex-box-row;
    .flex-justify-center;
    .flex-align-center;
    position: relative;
    width: 135px;
    height: 90px;
    border: 2px dashed @colorPrimary;
    border-radius: 6px;
    color: @colorPrimary;
    margin: @cellPaddingY / 2 0;
    font-size: @fontSizeMd;
    &.loading {
      pointer-events: none;
    }
    .text {
      margin: 0 10px;
    }
    .cancel-img {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 16px;
      height: 16px;
    }
  }
  .file-input {
    display: none;
  }
}
</style>
