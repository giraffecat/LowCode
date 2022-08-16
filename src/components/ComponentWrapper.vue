<template>
  <div :class="[isWidget ? 'nest-child' : 'nest-area']">
    <Component
      
      v-for="(item, index) in widgets"
      :key="index"
      :widget="item"
      :is="item.component"
      v-bind="item"
    >
      <ComponentWrapper
        :widgets.sync="item.children"
        :isWidget="true"
      ></ComponentWrapper>
    </Component>
  </div>
</template>

<script>
export default {
  name: "ComponentWrapper",
  inject: ["chontrol"],

  props: {
    isWidget: {
      type: Boolean,
      default: false,
    },
    widgets: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.nest-child {
  min-height: 80px;
  background: #f7f8fa80;
}

.nest-area {
  //   min-height: 600px;
}
</style>
