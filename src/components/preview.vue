<template>
    <div class="preview-page">
        <el-button class="close" @click="close">关闭</el-button>
        <div class="panel-container">

            <div
                class="panel"
                :style="{
                    width: panelSize[0] + 'px',
                    height: panelSize[1] + 'px',
                }"
            >
                        <div class="panel-header"></div>

                <ComponentWrapper
                    :widgets="widgets"
                />
            </div>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex'
export default {
    name: 'Preview',
    provide() {
    return {
      chontrol: this,
    };
  },

    data() {
        return {
            
        };
    },

    mounted() {
        
    }, 
    computed: mapState([
        'widgets',
        'panelSize'
    ]),
    methods: {
        close(){
            this.$emit('change', false)
        }
    },
};
</script>

<style lang="scss" scoped>
.preview-page{
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    padding: 20px;

    .panel-container {
        display: flex;
        justify-content: center;
        width: calc(100% - 40px);
        height: calc(100% - 120px);
        overflow: auto;
        .panel-header {
          widows: 100%; /*no*/
          height: 64px; /*no*/
          background-image: url("./image/phone-head.png");
          background-size: cover;
        }
        .panel {
            background: #fff;
            // position: relative;
            // margin: auto;
        }
    }

    .close {
        position: absolute;
        right: 20px;
        top: 20px;
    }

}


</style>