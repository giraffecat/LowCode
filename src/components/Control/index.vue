<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-12-20 15:16:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-06 17:37:37
-->
<template>
  <div class="control">
    <!-- 物料列表 -->
    <!-- :options="{ group: { name: 'itxst', pull: 'clone' }, sort: false }" -->
    <div class="control-models">
      <draggable
        v-model="$initializing"
        :group="{ name: 'itxst', pull: 'clone' }"
        :sort="false"
        :clone="handleClone"
        animation="300"
      >
        <div
          v-for="(item, index) in $initializing"
          :key="index"
          class="control-models-item"
        >
          <!-- <div>{{item}}</div> -->
          <i class="iconfont" :class="item.icon"></i>
          <span class="f13">{{ item.name }}</span>
        </div>
      </draggable>
    </div>

    <!-- 页面面板 -->
    <div class="control-page">
      <div class="panel">
        <div
          class="panel-content"
          :style="{ width: `${ScreenWidth}px`, height: `${ScreenHeight}px` }"
        >
          <div class="panel-header"></div>

          <!-- 可根据实际需求选择是否需要物料组件 -->

          <!-- 不可嵌套物料 -->
          <!-- <control-widget :widgets.sync="widgets" /> -->

          <!-- 递归可嵌套物料 -->
          <control-nest-widget :widgets.sync="widgets" />
          <!-- <div class="panel-footer"></div> -->
        </div>
      </div>
    </div>

    <!-- 物料配置 -->
    <div class="control-config">
      <template v-if="curComponent">
        <custom-schema-template
          :schema="curSchema"
          v-model="curComponent"
        ></custom-schema-template>
<!-- 
        <div>
          <h4 class="f-theme mt10 mb10">当前物料数据</h4>
          {{ curComponent }}
        </div> -->
      </template>
    </div>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
  name: "Control",

  provide() {
    return {
      chontrol: this,
    };
  },

  data() {
    return {
      //屏幕尺寸
      value: [375, 667],
      widgets: [],
      curComponent: undefined,
    };
  },
  mounted() {
    eventBus.$on("panelSize", (data) => {
      this.value = data;
    });
    eventBus.$on("updateWidgets",(curPage)=>{
      
      const curIdx = this.$store.state.pages.findIndex(
        (page) => page.name.slice(2) == curPage
      );
      // console.log('widget变化',curIdx);
      this.widgets = this.$store.state.pages[curIdx].widgets
    })
  },

  computed: {
    curSchema() {
      console.log("curSchema")
      return this.$fields[this.curComponent.component];
    },
    ScreenWidth() {
      // console.log(this.value)

      return this.value[0] + "";
    },
    ScreenHeight() {
      return this.value[1] + "";
    },
  },

  methods: {
    // 复制物料
    handleClone(model) {
      return {
        ...this._.cloneDeep(model),
        id: this.$getRandomCode(8),
      };
    },
  },
  watch: {
    widgets: {
      handler(val) {
        // eventBus.$emit("pageChange", [1, 0]);
        // console.log("widgets", val)
        // 更新此时的widgets
        this.$store.commit("setWidgets", val);
        // 更新pages中的widgets
        this.$store.commit("updateWidgets", val);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.control {
  display: flex;
  height: calc(100vh - 60px);

  .control-models {
    width: 236px;
    height: calc(100vh - 60px);
    padding: 10px 20px;
    background: #fff;

    .control-models-item {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 90px; /*no*/
      padding: 15px 0; /*no*/
      font-size: 12px; /*no*/
      color: #666;
      cursor: pointer;

      i {
        font-size: 29px; /*no*/
        margin-top: 5px; /*no*/
        margin-bottom: 10px; /*no*/
      }

      &:hover {
        color: #fff !important;
        background: $color-theme;
        .canvas-left-item-type {
          color: #fff;
        }
      }
    }
  }

  .control-page {
    display: flex;
    justify-content: center;
    flex: 1;
    height: 100%;
    overflow: auto;

    .panel {
      .panel-content {
        margin: 50px auto;
        background: #fff;
        box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.1);
        .panel-header {
          // border: 1px solid red;
          height: 64px; /*no*/
          background-image: url("../../assets/images/head.png");
          background-size: cover;
        }
        // .panel-footer{
        //   height: 100px;
        // }
      }
    }
  }

  .control-config {
    width: 360px;
    height: calc(100vh - 60px);
    overflow: auto;
    animation-duration: 0.2s;
    padding: 10px;
    background: #fff;
  }
}
</style>
