<template>
  <el-carousel
    :style="{ width: theWidth }"
    :height="theHeight"
    :interval="theInterval"
    :autoplay="isAutoPlay"
    :direction="theDirection"
  >
    <el-carousel-item v-for="item in carouselImgList" :key="item.id">
      <div class="imgContainer">
        <img class="imgs" :src="item.image" />
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "McCarousel",

  props: {
    attrs: {
      type: Object,
      default: () => {},
    },
    carouselImgList: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    theWidth() {
      return `${this.attrs.width}px`;
    },
    theHeight() {
      return `${this.attrs.height}px`;
    },
    theInterval() {
      return this.attrs.switchInterval * 1000;
    },
    isAutoPlay() {
      return this.attrs.autoPlay;
    },
    theDirection() {
      return this.attrs.direction;
    },
  },
};
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