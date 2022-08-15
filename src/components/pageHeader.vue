<template>
  <div class="page-head">
    <span>字节青训营Low-Code</span>
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
    <el-button size="small" @click="toSchema">schema 生成器</el-button>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
  name: "pageHeader",
  data() {
    return {
      value: [390, 844],
      options: [
        {
          value: [390, 844],
          label: "iPhone 13",
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
    };
  },
  methods: {
    toSchema() {
      let { href } = this.$router.resolve({
        path: "/schema",
      });
      window.open(href);
    },
    emitValue() {
      eventBus.$emit("panelSize", this.value);
      // console.log(this.value);
    },
  },
};
</script>

<style>
.page-head {
  position: fixed;
  top: 0;
  left: 0;
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
