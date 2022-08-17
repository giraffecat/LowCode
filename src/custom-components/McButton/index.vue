<!--
 * @Description: 标题组件
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:37:07
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-28 09:23:23
-->
<template>
  <!-- <div class="title"> -->
    <el-button :style="{
        '--bgcColor': buttonStyles.bgColor
          ? buttonStyles.bgColor
          : 'rgba(81, 151, 255, 1)',
          '--titleColor': buttonStyles.titleColor
          ? buttonStyles.titleColor
          : 'rgba(242, 242, 242, 1)',
          '--titleSize': buttonStyles.titleSize+'px',
          '--buttonLeft':buttonModel=='free'?buttonFree+'%':(buttonModel=='middle'?'50%':'100%'),
          '--trans':buttonModel=='middle'?'-50%':(buttonModel=='free'?'0%':'-100%'),
           }" >{{buttonTitle}}</el-button>
  <!-- </div> -->
</template>

<script>
export default {
  name: "McButton",

  props: {
    buttonTitle: {
      type: String,
      default: '',
    },
    buttonModel :{
      type: String,
      default: '',
    },
    buttonFree:{
      type:Number,
      default:()=>{}
    },
    buttonStyles: {
      type: Object,
      default: () => {},
    },
  },

};
</script>

<style lang="scss" scoped>
.el-button{
  position: relative;
  background-color: var(--bgcColor);
  color:var(--titleColor);
  font-size:var(--titleSize);
  left:var(--buttonLeft);
  transform:translate(var(--trans));
}
</style>
