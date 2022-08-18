
<template>
  <div class="outer"  :style="{
        '--paddingLeft': optionAttrs.paddingLeft+'%',
          '--paddingRight': optionAttrs.paddingRight+'%',
      }">
    <el-select
      v-model="value1"
      placeholder="请选择"
      @click.native="selectclick"
      :popper-append-to-body="false"
      :style="{
        '--select-borderColor': optionAttrs.borderColor
          ? optionAttrs.borderColor
          : '#DCDFE6',
          '--select-borderWidth': optionAttrs.borderWidth
          ? optionAttrs.borderWidth+'px'
          : '1px'
      }"
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
  watch: {
    optionList: {
      handler() {
        this.value1=""
      },
      immediate: true,
      deep: true,
    },
  }
};
</script>

<style lang="scss" scoped>
.outer{
  padding-left: var(--paddingLeft);
  padding-right: var(--paddingRight);
}

/deep/ .el-input__inner{
  border-width:var(--select-borderWidth);
      border-color: var(--select-borderColor);
  }
/deep/.el-select .el-input.is-focus .el-input__inner,
/deep/ .el-select .el-input__inner:focus{
  border-color: var(--select-borderColor);
}

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
