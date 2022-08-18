<!--
 * @Description: 图片组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-27 17:02:20
-->
<template>
  <div class="imgContainer">
    <img
      class="img"
      :src="imagePath || defaultImage"
      :style="{ borderRadius: radius + 'px', height: height + 'px' }"
    />
  </div>
</template>

<script>
export default {
  name: "McImg",

  props: {
    imagePath: {
      type: String,
      default: "",
    },
    radius: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 100,
    },
  },

  data() {
    return {
      defaultImage:
        "https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png!large.webp",
    };
  },
};
</script>

<style lang="scss" scoped>
.imgContainer {
  overflow: hidden;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
