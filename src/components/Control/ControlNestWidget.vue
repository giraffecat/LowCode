<!--
 * @Description: 可嵌套物料列表
 * @Autor: WangYuan
 * @Date: 2021-12-20 17:37:46
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-27 17:49:36
-->
<template>
  <draggable
    v-model="list"
    group="itxst"
    ghostClass="ghost"
    chosenClass="chosen"
    selector="selector"
    :animation="500"
    :sort="true"
    :class="[isWidget ? nest : 'nest-area']"
  > 
    <!-- <div>filed - {{widgets}}</div> -->
    <widget-shape v-for="item in list" :key="item.id" :widget="item">
      <!-- <div>{{item}}</div> -->
      <component :is="item.component" v-bind="item">
        <ControlNestWidget
          :widgets.sync="item.children"
          :isWidget="true"
          :direction="item.direction"
        ></ControlNestWidget>
      </component>
    </widget-shape>
  </draggable>
</template>

<script>

export default {
  name: "ControlNestWidget",

  inject: ["chontrol"],

  props: {
    isWidget: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: Boolean,
      default: "column",
    },
    widgets: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    nest() {
      console.log("change")
      if(this.isWidget && this.direction == "column") {
        console.log("column")
        return 'nest-child column'
      } else {
        console.log("column")
        return 'nest-child row'
      }
    }
  },

  data() {
    return {
      list: [],
    };
  },

  watch: {
    widgets: {
      handler(val) {
        console.log("widgets", val)
        this.list = val;
      },
      immediate: true,
      deep: true,
    },
    list: {
      handler(val) {
        this.$emit("update:widgets", val);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.nest-child {
  min-height: 80px;
  // display:flex;
  // flex-direction: row;
  background: #f7f8fa80;
}
.row {
  display: flex;
  flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
}

.nest-area {
  min-height: 600px;
}

.nest-none {
  background: url("https://file.qingflow.com/assets/empty-content/applying-editorial-tips.png");
  background-size: 100% 100%;
}
</style>