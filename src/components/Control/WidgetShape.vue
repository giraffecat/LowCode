<!--
 * @Description: 物料容器 （配置工具栏）
 * @Autor: WangYuan
 * @Date: 2021-05-24 16:37:58
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-06 17:37:31
-->
<template>
  <div class="shape" @click.stop="setcurComponent(widget)" ref="shape">
   
    <!-- 选中组件高亮 -->
    <div v-if="isCurComponent(widget.id)" class="shape-solid event-none"></div>


    <div class="shape-dashed event-none"></div>

    <!-- 组件工具栏 -->
    <div v-if="show" class="shape-tab" :style="{ right: getRightStyle() }">
      <template v-if="isCurComponent(widget.id)">
        <i
          class="iconfont icon-shanchu tab-icon f16"
          @click.stop="delComponent(chontrol.widgets, widget.id)"
        ></i>

        <i
          class="iconfont icon-fuzhiyemian tab-icon f16"
          @click.stop="copyComponent(chontrol.widgets, widget.id)"
        ></i>
      </template>

      <!-- <span v-else>{{ widget.name }}</span> -->
    </div>

    <slot></slot>
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  name: "WidgetShape",

  inject: ["chontrol"],

  props: {
    widget: {
      type: Object,
      default: () => ({}),
    },
  },

  mounted() {
    this.show = false;
    console.log(this.widget)
    eventBus.$on('selectClick', (id) => {
        this.show=true
        this.chontrol.curComponent = this.widget.id==id?this.widget:this.chontrol.curComponent;
    })
  },

  data() {
    return {
      show: false,
    };
  },

  methods: {
    getRightStyle() {
      let [width] = window.getComputedStyle(this.$refs.shape).width.split("px");
      // console.log("width",width, `${-(380 - width) / 2 - 86}px`)
      return `-86px`;
    },

    isCurComponent(id) {
      if(this.chontrol?.curComponent?.id != id) {this.show = false}
      return this.chontrol?.curComponent?.id == id;
    },

    // 选中物料
    setcurComponent(cmp) {
      this.show = true;
      this.chontrol.curComponent = cmp;
    },

    // 删除物料
    delComponent(list, id) {
      // console.log('删除');
      // 遍历查找目标下标
      let index = list.reduce((pre, cur, i) => {
        return cur.id == id ? i : pre;
      }, -1);

      // 找到目标，删除无名
      if (index >= 0) {
        list.splice(index, 1);
        // console.log("删除成功");
        // console.log(list);
      } else {
        // 递归子物料
        list
          .filter((c) => c.children)
          .forEach((c) => {
            this.delComponent(c.children, id);
          });
      }
    },

    // 赋值物料
    copyComponent(list,id){
      // console.log('复制')
      // 遍历查找目标
      let resArray = [-1,[]]
      list.forEach((item,index)=>{
        if(item.id === id){
          resArray[0] = index
          resArray[1] = this._.cloneDeep(item)
        }
      })
      
      
      // 找到目标，复制物料
      if (resArray[0] >= 0) {
        resArray[1].id = this.$getRandomCode(8)
        // console.log('1111', resArray[1].id)
        list.splice(resArray[0], 0, resArray[1]);
        // console.log("复制成功");
        
      } else {
        // 递归子物料
        list
          .filter((c) => c.children)
          .forEach((c) => {
            this.copyComponent(c.children, id);
          });
      }
      // console.log(list.forEach(item=>console.log(item,item.id)));
    }
    
  },
};
</script>

<style lang="scss" scoped>
.shape {
  position: relative;

  &:hover > .shape-dashed {
    display: block;
  }

  .shape-dashed {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: dashed 1px $color-theme;
    z-index: 100;
  }

  .shape-solid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: solid 2px $color-theme;
    z-index: 100;
  }

  .shape-tab {
    position: absolute;
    top: 0; /*no*/
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px; /*no*/
    font-size: 12px; /*no*/
    color: #333;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index:999;
    &::after {
      content: "";
      position: absolute;
      right: 100%; /*no*/
      top: 7px; /*no*/
      width: 0; /*no*/
      height: 0; /*no*/
      border-width: 5px; /*no*/
      border-style: solid;
      border-color: transparent;
      margin-bottom: -1px; /*no*/
      border-right-width: 5px; /*no*/
      border-right-color: currentColor;
      color: #fff;
    }
    .iconfont{
      padding: 0.2rem 0;
    }
  }

  .event-none {
    pointer-events: none;
  }

  .tab-icon {
    color: #969799;
    cursor: pointer;

    &:hover {
      color: #87888a;
    }
  }
}
</style>
