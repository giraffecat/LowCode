<template>
  <div>
    <van-notice-bar
      :text="noticeContent.text"
      v-bind="getCmpStyle()"
      left-icon="volume-o"
    >
      <template v-if="noticeContent.icon" slot="left-icon">
        <van-image width="30" height="30" :src="noticeContent.image" />
      </template>
    </van-notice-bar>
  </div>
</template>

<script>
export default {
  name: 'McNotice',

  props: {
    noticeStyles: {
      type: Object,
      default: () => {}
    },
    noticeContent: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    getCmpStyle () {
      return {
        background: this.noticeStyles.cmpBackground,
        color: this.noticeStyles.fontColor
      }
    }
  }
}
</script>
