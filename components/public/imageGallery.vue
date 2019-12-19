<template>
  <div class="image-gallery">
    <div class="main-image" @click="handleOpenGallery">
      <img :src="images[0].url" alt="">
    </div>
    <ul class="image-list" @click="handleOpenGallery">
      <li v-for="(item, index) of images.slice(0, 4)" :key="index" class="image-item">
        <img :src="item.url" alt="">
      </li>
    </ul>
    <div v-show="showGallery" class="image-gallery">
      <div class="gallery-content">
        <header class="header">
          <span class="close-button el-icon-close" @click="handleCloseGallery"></span>
        </header>
        <div class="content">
          <div class="figure">
            <img :src="images[currentImageIndex].url" alt="">
            <div class="footer-count">
              {{ currentImageIndex + 1 }} / {{ images.length }}
            </div>
          </div>
          <span class="arrow arrow-left el-icon-arrow-left" :class="{disabled: currentImageIndex === 0}" @click="handleGoLast"></span>
          <span class="arrow arrow-right el-icon-arrow-right" :class="{disabled: currentImageIndex === images.length - 1}" @click="handleGoNext"></span>
        </div>
        <footer class="footer">
          <ul class="gallery-list">
            <li
              v-for="item of currentGalleryList"
              :key="item.index"
              class="gallery-image-item"
              :class="{active: currentImageIndex === item.index}"
              @click="handleSelectImage(item.index)"
            >
              <img :src="item.url" alt="">
            </li>
          </ul>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    },
    bottomListItemCount: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      showGallery: false,
      currentImageIndex: 0
    }
  },
  computed: {
    currentGalleryList() {
      if (this.currentImageIndex < Math.floor(this.bottomListItemCount / 2)) {
        return this.images.slice(0, this.bottomListItemCount)
      } else if (this.currentImageIndex > this.images.length - Math.ceil(this.bottomListItemCount / 2)) {
        return this.images.slice(this.images.length - this.bottomListItemCount, this.images.length)
      } else {
        return this.images.slice(this.currentImageIndex - Math.floor(this.bottomListItemCount / 2), this.currentImageIndex + Math.ceil(this.bottomListItemCount / 2))
      }
    }
  },
  created() {
    this.images.forEach((item, index) => {
      item.index = index
    })
  },
  methods: {
    handleOpenGallery() {
      this.showGallery = true
    },
    handleCloseGallery() {
      this.showGallery = false
      this.currentImageIndex = 0
    },
    handleGoLast() {
      if (this.currentImageIndex === 0) {
        return
      }
      this.currentImageIndex--
    },
    handleGoNext() {
      if (this.currentImageIndex === this.images.length - 1) {
        return
      }
      this.currentImageIndex++
    },
    handleSelectImage(index) {
      this.currentImageIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-gallery {
    width: 380px;
    .main-image {
      width: 100%;
      height: 214px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-list {
      width: 100%;
      padding-top: 10px;
      .image-item {
        float: left;
        width: 91px;
        height: 50px;
        margin-right: 4px;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .image-gallery {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      background-color: rgba(0, 0, 0, .8);
      .gallery-content {
        width: 1190px;
        height: 100%;
        padding-top: 30px;
        margin: auto;
        overflow: hidden;
        .header {
          text-align: right;
          padding-right: 20px;
          .close-button {
            display: inline-block;
            width: 40px;
            height: 40px;
            font-size: 40px;
            cursor: pointer;
            color: #fff;
          }
        }
        .content {
          margin-top: 40px;
          padding: 0 230px;
          position: relative;
          height: 500px;
          .arrow {
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-radius: 50%;
            background-color: #000;
            color: #fff;
            font-size: 30px;
            &.disabled {
              cursor: no-drop;
            }
            &.arrow-left {
              left: 0;
            }
            &.arrow-right {
              right: 0;
            }
          }
          .figure {
            width: 100%;
            height: auto;
            position: relative;
            img {
              width: 100%;
              height: auto;
              max-height: 500px;
            }
            .footer-count {
              position: absolute;
              left: 0;
              bottom: 2px;
              width: 100%;
              line-height: 30px;
              color: #fff;
              font-size: 14px;
              padding-left: 12px;
              background-color: rgba(0, 0, 0, .4);
            }
          }
        }
        .footer {
          position: absolute;
          bottom: 20px;
          width: 1190px;
          height: 130px;
          overflow: hidden;
          .gallery-list {
            display: flex;
            height: 100%;
            .gallery-image-item {
              flex: 1;
              margin-right: 10px;
              border: 2px solid transparent;
              &:last-child {
                margin-right: 0;
              }
              &.active {
                border-color: #fff;
              }
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>
