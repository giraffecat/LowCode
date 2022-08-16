<template>
  <div class="videoContainer" :style="{ borderRadius: radius + '%' }">
    <video class="video" autoplay=true playsinline>
      <source :src="videoLink" type="video/mp4">
      你的浏览器不支持Video标签
    </video>
  </div>
</template>

<script>
export default {
  name: 'McVideo',

  props: {
    attrs: {
      type: Object,
      default: () => { }
    }
  },

  computed: {
    videoLink() {
      return this.attrs.videoLink;
    },
    radius() {
      return this.attrs.videoBorderRadius;
    }
  },

}
</script>

<style lang="scss" scoped>
.videoContainer {
  width: 100%;
  overflow: hidden;

  .video {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
</style>