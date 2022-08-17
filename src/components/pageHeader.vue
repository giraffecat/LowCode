<template>
  <div class="page-head">
    <span>字节青训营Low-Code</span>
    <el-button size="small" @click="deleteAll">清空画布</el-button>
    <el-button size="small" @click="addPage">新增画布</el-button>
    <div class="page-menu">
      <div class="panel-size-select">
        <el-select
          v-model="value"
          class="m-2"
          placeholder="IPhone13"
          size="large"
          @change="emitValue"
        >
          <el-option
            v-for="item in options"
            :key="item.value.join('')"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <el-button size="small" @click="toPreview">预览</el-button>
    <el-button size="small" @click="toSchema">schema 生成器</el-button>

    <!-- 预览 -->
    <Preview v-if="isShowPreview" @change="handlePreviewChange" />
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";

export default {
  name: "pageHeader",
  data() {
    return {
      value: [375, 667],
      options: [
        {
          value: [375, 667],
          label: "iPhone 8",
        },
        {
          value: [375, 812],
          label: "iPhone 13 mini",
        },
        {
          value: [428, 926],
          label: "iPhone 13 Pro Max",
        },
        {
          value: [744, 1133],
          label: "iPad Mini (6th gen)",
        },
        {
          value: [1024, 1366],
          label: 'iPad Pro (5th gen 12.9")',
        },
      ],
      isShowPreview: false,
    };
  },
  methods: {
    toSchema() {
      let { href } = this.$router.resolve({
        path: "/schema",
      });
      window.open(href);
    },
    toPreview() {
      this.isShowPreview = true;
    },
    emitValue() {
      eventBus.$emit("panelSize", this.value);
      this.$store.commit("setPenelSize", this.value);
      // console.log(this.value);
    },
    handlePreviewChange() {
      this.isShowPreview = false;
    },
    deleteAll() {
      eventBus.$emit("clearWidgets", []);
    },
    // 新增画布
    addPage() {
      const page = {
        id: this.$getRandomCode(4),
        name: "页面1",
        widgets: [],
        home: false,
      };
      
    this.$store.commit("addPage", page);
    },
  },
  mounted() {
    const homePage = {
      id: this.$getRandomCode(4),
      name: "主页",
      widgets: [],
      home: true,
    };

    this.$store.commit("addPage", homePage);
  },
};
</script>

<style lang="scss" scoped>
.page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 4px 6px 0 rgba(12, 31, 80, 0.04);
}
</style>
