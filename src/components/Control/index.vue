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
        <!-- <div
          class="panel-content"
          :style="{ width: `${ScreenWidth}px`, height: `${ScreenHeight}px` }"
        > -->
        <widget-shape
            class="panel-content"
            :style="{ width: `${ScreenWidth}px`, height: `${ScreenHeight}px` }"
            v-for="page in pages"
            :key="page.id"
            :widget="page"
          >
          <div class="panel-header"></div>

          <!-- 递归可嵌套物料 -->
          <control-nest-widget :widgets.sync="page.widgets"/>
          <!-- <div class="panel-footer"></div> -->
        <!-- </div> -->
        </widget-shape>
      </div>
    </div>

    <!-- 物料配置 -->
    <div class="control-config">
      <template v-if="curComponent">
        <custom-schema-template
          :schema="curSchema"
          v-model="curComponent"
        ></custom-schema-template>

        <div>
          <h4 class="f-theme mt10 mb10">当前物料数据</h4>
          {{ curComponent }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
import { mapState } from "vuex";
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
      // widgets: [],
      curComponent: undefined,
    };
  },
  mounted() {
    eventBus.$on("panelSize", (data) => {
      this.value = data;
    });
    eventBus.$on("clearWidgets", (data) => {
      this.widgets = data;
    });
  },
  computed: {
    curSchema() {
      return this.$fields[this.curComponent.component];
    },
    ScreenWidth() {
      // console.log(this.value)
      return this.value[0] + "";
    },
    ScreenHeight() {
      return this.value[1] + "";
    },
    ...mapState(["pages"]),
  },

  methods: {
    // 复制物料
    handleClone(model) {
      // console.log("deepClone")
      // console.log("widgets", this.widgets)
      return {
        ...this._.cloneDeep(model),
        id: this.$getRandomCode(8),
      };
    },
  },
  watch: {
    pages: {
      handler(val) {
        // 当前的widgets
        // this.widgets = 
        // console.log("pages", val)
        this.$store.commit("setPages", val);
        // // 更新仓库里的pages数据
        // const page = {
        //   id: this.$getRandomCode(4),
        //   name: "主页",
        //   widgets: [val],
        //   home: true,
        // };
        // this.$store.commit('setPages', page)
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
        margin: 10px auto;
        background: #fff;
        box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.1);
        .panel-header {
          widows: 100%; /*no*/
          height: 64px; /*no*/
          background-image: url("../image/phone-head.png");
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
