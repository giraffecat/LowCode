<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-12-20 17:09:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-27 17:41:08
-->
<template>
  <div class="cnt">
    <!-- <div class="cnt-head h5-underline"></div> -->
    <div class="cnt-body" ref="nestParent">
      <!-- <div>model - {{model}}</div> -->
      <slot class="nest-child"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColumnContainer",
  props: {
    margin: {
      type: Object,
      default: {},
    },
    padding: {
      type: Object,
      default: {},
    },
    justifyContent: {
      type: String,
      default: "flex-start",
    },
    alignItems: {
      type: String,
      default: "center",
    },
    background: {
      type: String,
      default: "",
    },
    gap: {
      type: Number,
      default: 10,
    },
    boxShadow: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.updateStyles();
    // console.log(this.$slots)
  },
  computed: {
    // 主标题样式
    getTitleStyle() {
      // console.log(this.justifyContent)
      return {
        justifyContent: this.justifyContent,
        alignItems: this.alignItems,
        background: this.background,
        gap: this.gap + "px",
        margin: `${this.margin.u}px ${this.margin.r}px ${this.margin.d}px ${this.margin.l}px`,
        padding: `${this.padding.y}px ${this.padding.x}px`,
        boxShadow: `${
          this.boxShadow === true
            ? "0 4px 6px 0 rgba(12, 31, 80, 0.14)"
            : "none"
        } `,
      };
    },
  },
  methods: {
    updateStyles() {
      // console.log(this.padding)
      const el = this.$refs.nestParent.childNodes[0];
      // el.style.justifyContent = "flex-end"
      Object.assign(el.style, this.getTitleStyle);
    },
  },
  watch: {
    $slot: {
      handler() {
        // console.log("change slot");
      },
    },
    justifyContent: "updateStyles",
    alignItems: "updateStyles",
    background: "updateStyles",
    gap: "updateStyles",
    margin: {
      handler: "updateStyles",
      deep: true,
    },
    padding: {
      handler: "updateStyles",
      deep: true,
    },
    boxShadow: "updateStyles",
  },
};
</script>

<style lang="scss" scoped>
.cnt {
  .nest-child {
    display: flex;
    flex-direction: column;
  }
}
</style>