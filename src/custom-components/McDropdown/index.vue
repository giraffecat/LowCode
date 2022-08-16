
<template>
  <div>
    <el-select
      v-model="value1"
      placeholder="请选择"
      @click.native="selectclick"
    >
      <el-option
        v-for="item in optionList"
        :key="item.value"
        :label="item.text"
        :value="item.value"
        :style="{
        '--select-selectedColor': optionAttrs.selectedColor
          ? optionAttrs.selectedColor
          : 'rgba(81, 151, 255, 1)',
          '--select-hoverColor': optionAttrs.hoverColor
          ? optionAttrs.hoverColor
          : 'rgba(242, 242, 242, 1)'
      }"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
  name: "McDropdown",
  data() {
    return {
      value1: "",
    };
  },
  props: {
    optionAttrs: {
      type: Object,
      default: () => {},
    },
    optionList: {
      type: Array,
      default: () => {},
    },
  },

  methods: {
    selectclick() {
      eventBus.$emit("selectClick", this.$attrs.id);
    },
  },
};
</script>

<style lang="scss" scoped>

.el-select-dropdown__list {
	.el-select-dropdown__item.selected {
		color: var(--select-selectedColor);
	}
	.el-select-dropdown__item.hover,
	.el-select-dropdown__item:hover {
		background-color:var(--select-hoverColor);
	}
}
</style>
