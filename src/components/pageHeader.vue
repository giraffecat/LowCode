<template>
  <div class="page-head">
    <span>字节青训营Low-Code</span>
    <el-button size="small" @click="deleteAll">清空当前画布</el-button>
    <!-- <el-button size="small" @click="savePanel">保存画布</el-button> -->
    <el-button size="small" @click="newPage">新建画布</el-button>
    <el-button size="small" @click="deletePage">删除画布</el-button>

    <div class="page-option">
      <el-select v-model="curPage" placeholder="" @change="changeOptions">
        <el-option
          v-for="item in pageOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="page-menu">
      <div class="panel-size-select">
        <el-select
          v-model="value"
          class="m-2"
          placeholder="IPhone XR"
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
import { mapState } from "vuex";
export default {
  name: "pageHeader",
  data() {
    return {
      value: [375, 667],
      curPage: -1,
      pageOptions: [],

      options: [
        {
          value: [375, 667],
          label: "iPhone XR",
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
  computed: mapState(["pages"]),
  watch: {
    curPage(cur, pre) {
      // console.log('cishi',cur);
      this.$store.commit("setPage", Number(cur));
    },
  },
  mounted() {
    this.newPage();
    eventBus.$on('updateCurPage',(cur)=>{
      // console.log(cur);
      this.curPage = cur
      
    })
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
      this.$store.commit('setPreview',true)
    },
    emitValue() {
      eventBus.$emit("panelSize", this.value);
      this.$store.commit("setPenelSize", this.value);
    },
    handlePreviewChange() {
      this.isShowPreview = false;

    },
    deleteAll() {
      // 每次更新仓库的时候，都要手动更新一下updateWidgets
      this.$store.commit('updateWidgets',[])
      eventBus.$emit("updateWidgets", this.curPage);
    },
    newPage() {
      // 将画布清空
      this.$store.commit("setWidgets", []);
      const len = this.pages.length;
      const i = len > 0 ? +this.pages[len - 1].name.slice(2) + 1 : 0;
      // console.log(i)
      const page = {
        id: this.$getRandomCode(8),
        name: `页面${i}`,
        widgets: [],
      };
      this.$store.commit("newPage", page);
      this.curPage = i;
      this.pageOptions.push({
        value: this.curPage,
        label: `页面${this.curPage}`,
      });
      this.changeOptions();

      this.$notify({
        title: "成功",
        message: "创建成功！",
        type: "success",
      });
    },
    savePanel() {
      //保存
    },
    deletePage() {
      let delIdx = 0;
      // curPage对应的下标
      const curIdx = this.pageOptions.findIndex(
        (page) => page.value == this.curPage
      );
      // 页数超过1才能删除
      if (this.pages.length > 1) {
        // 如何更新curPage?判断此时curPage的下标，新的下标就是此时下标或-1
        if (curIdx == this.pageOptions.length - 1) {
          delIdx = curIdx - 1;
        } else {
          delIdx = curIdx;
        }
        this.$store.commit("deletePage", curIdx);
        this.pageOptions.splice(curIdx, 1);
        this.curPage = this.pageOptions[delIdx].value;

        // console.log("此时widgets展示的", this.curPage);
        eventBus.$emit("updateWidgets", this.curPage);
        this.$notify({
          title: "成功",
          message: "成功删除画布",
          type: "success",
        });
      } else {
        this.$notify.error({
          title: "失败",
          message: "不可删除画布",
        });
      }
    },
    changeOptions() {
      eventBus.$emit("updateWidgets", this.curPage);
    },
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
