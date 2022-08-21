<template>
  <config-item :label='label'>
    <div class="flex col-center h32">
      <div
        v-if="!mValue.id"
        class="f12 f-theme pointer"
        @click="open"
      >
        选择跳转到的页面
      </div>

      <template v-else>
        <el-tag size='small'>{{pageName}}</el-tag>
        <span
          class="ml5 f12 f-theme pointer"
          @click="open"
        >修改</span>
      </template>
    </div>

    <JumpDialog ref='jump'></JumpDialog>

  </config-item>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";
import { mapState } from "vuex";

export default {
  name: "SchemaJump",

  mixins: [schemaMixin],

  provide() {
    return {
      value: this.value,
    };
  },

  props: {
    value: {
      default: () => ({}),
    },
  },

  computed: {
    ...mapState(["pages"]),
    pageName() {
      // console.log(this.mValue);
      let page = null;
      switch (this.mValue.type) {
        case "custom":
          page = this.pages.find((page) => page.id == this.mValue.id);
          break;
        case "link":
          page = { name: "外链h5" };
          break;
        default:
          break;
      }
      return page.name;
    },
  },

  methods: {
    open() {
      this.$refs.jump.open();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
