<!--
 * @Description: 标题组件
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:37:07
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-28 09:23:23
-->
<template>
  <!-- <div class="title"> -->
  <el-button
    :style="{
      '--bgcColor': buttonStyles.bgColor
        ? buttonStyles.bgColor
        : 'rgba(81, 151, 255, 1)',
      '--titleColor': buttonStyles.titleColor
        ? buttonStyles.titleColor
        : 'rgba(242, 242, 242, 1)',
      '--borderColor': buttonStyles.bdColor ? buttonStyles.bdColor : '#DCDFE6',
      '--titleSize': buttonStyles.titleSize + 'px',
      '--paddingLeft': buttonStyles.paddingLeft + 'px',
      '--paddingTop': buttonStyles.paddingTop + 'px',
      '--borderWidth': buttonStyles.borderWidth + 'px',
    }"
    @click="toJump()"
    >{{ buttonTitle }}</el-button
  >
  <!-- </div> -->
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
  name: "McButton",

  props: {
    buttonTitle: {
      type: String,
      default: () => {},
    },
    buttonModel: {
      type: String,
      default: () => {},
    },
    buttonFree: {
      type: Number,
      default: () => {},
    },
    buttonStyles: {
      type: Object,
      default: () => {},
    },
    jump: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    // 点击跳转
    toJump() {
      if (this.$store.state.isPreview) {
        // console.log("jump");
        const id = this.jump.id;
        // 如果是外部链接
        if(this.jump.type === 'link'){
          window.open(id)
        }
        // 如果是内部页面
        if(this.jump.type === 'custom'){
          // 将现在的widgets变为id对应的页码
          const curPage = this.$store.state.pages.find(page=>page.id === id).name.slice(2)
          this.$store.commit('setPage', Number(curPage))
          eventBus.$emit("updateWidgets",Number(curPage))
          eventBus.$emit('updateCurPage',Number(curPage))    
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  position: relative;
  background-color: var(--bgcColor);
  color: var(--titleColor);
  font-size: var(--titleSize);
  padding-top: var(--paddingTop);
  padding-left: var(--paddingLeft);
  padding-bottom: var(--paddingTop);
  padding-right: var(--paddingLeft);
  border-color: var(--borderColor);
  border-width: var(--borderWidth);
}
</style>
