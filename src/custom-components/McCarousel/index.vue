<template>
  <el-carousel :height="theHeight" :interval="theInterval" :autoplay="isAutoPlay">
    <el-carousel-item v-for="item in carouselImgList" :key="item.id">
      <div class="imgContainer">
        <img class="imgs" :src="item.image">
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'McCarousel',

  props: {
    attrs: {
      type: Object,
      default: () => { }
    },
    carouselImgList: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    theHeight() {
      return `${this.attrs.height}px`
    },
    theInterval() {
      return this.attrs.switchInterval * 1000;
    },
    isAutoPlay() {
      return this.attrs.autoPlay;
    }
  },

}
</script>

<style lang="scss" scoped>
.imgContainer {
  height: 100%;
  width: 100%;

  .imgs {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>