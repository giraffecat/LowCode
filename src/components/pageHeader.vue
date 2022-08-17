<template>
  <div class="page-head">
    <span>字节青训营Low-Code</span>
    <el-button size="small" @click="deleteAll">清空画布</el-button>
    <!-- <el-button size="small" @click="savePanel">保存画布</el-button> -->
    <el-button size="small" @click="newPage">新建画布</el-button>
    <el-button size="small" @click="deletePage">删除画布</el-button>

    <div class="page-option">
      <el-select
        v-model="curPage"
        placeholder=""
        @click.native="changeOptions"
      >
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
    <Preview v-if="isShowPreview" @change="handlePreviewChange"/>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
import { rejects } from "assert";
export default {
  name: "pageHeader",
  data() {
    return {
      value: [375, 667],

      curPage: null,
      pageOptions: [],

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
  watch: {
    curPage(cur, pre) {
      //删除会触发
      eventBus.$emit("pageChange", [cur, pre]);
    },
  },
  mounted() {
    this.newPage()
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
    },
    handlePreviewChange() {
      this.isShowPreview = false;
    },
    deleteAll() {
      eventBus.$emit("clearWidgets", []);
    },
    newPage() {
      this.$store.commit("newPage",[]);
      this.changeOptions()
      this.curPage =  this.pageOptions[this.pageOptions.length - 1].value;
      this.$notify({
          title: '成功',
          message: '创建成功！',
          type: 'success'
        });
    },
    savePanel() {
      //保存
    },
    deletePage() {
      //删除当前页面 => 先跳转回第上一个页面 => 再删除当前页面
      let deletePage =  this.curPage;
      //先触发页面跳转
      new Promise((resolve, reject) => {
        if(this.curPage == 0 && this.$store.state.pages.length == 1) {
          reject();
        }
        this.curPage = this.pageOptions[this.curPage - 1].value;
        resolve();
      }).then(() => {
        eventBus.$emit("deletePage", deletePage);
        this.$notify({
          title: '成功',
          message: '成功删除画布',
          type: 'success'
        });
      }).catch(() => {
        this.$notify.error({
          title: '失败',
          message: '不可删除画布',
        });
      })
    },

    changeOptions() {
      const pages = this.$store.state.pages;
      if (pages.length > 0) {
        this.pageOptions = [];
        for (let i in pages) {
          this.pageOptions[i] = { value: i, label: `页面${i}` };
        }
      } else {
        this.pageOptions = [];
      }
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
