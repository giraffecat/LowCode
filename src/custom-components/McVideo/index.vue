<template>
  <div class="videoContainer" :style="{ borderRadius: radius + '%' }">
    <video class="video" playsinline ref="video" @timeupdate="handleProgress">
      <source :src="videoLink" type="video/mp4" />
      你的浏览器不支持Video标签
    </video>
    <div class="controlers">
      <div class="progress" @click="scrub($event)">
        <div class="progress_filled" :style="{ flexBasis: flexBasis }"></div>
      </div>
      <div class="controlers-buttons">
        <div class="left">
          <button
            @click="togglePlay"
            class="player_button toggle iconfont"
            :class="isPlay ? 'icon-zanting' : 'icon-bofang'"
          ></button>
          <button class="player_button iconfont icon-yangshengqi">
            <input
              type="range"
              name="volume"
              class="player_slider"
              min="0"
              max="1"
              step="0.05"
              v-model="volume"
              @click="handleRangeUpdate()"
            />
          </button>
        </div>
        <div class="right">
          <button class="speed_button" @click="skip(-10)">« 10s</button>
          <button class="speed_button" @click="skip(25)">25s »</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "McVideo",

  props: {
    attrs: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isPlay: false,
      flexBasis: 0,
      volume: 0.5,
    };
  },
  methods: {
    togglePlay() {
      this.isPlay = !this.isPlay;
      const method = this.$refs.video.paused ? "play" : "pause";
      this.$refs.video[method]();
    },
    // 更新进度条
    handleProgress() {
      const percent =
        (this.$refs.video.currentTime / this.$refs.video.duration) * 100;
      this.flexBasis = `${percent}%`;
      if(percent === 100 ) this.isPlay =  false
      // console.log(percent,this.isPlay)
      
    },
    // 鼠标点击进度条
    scrub(e) {
      const scrubTime =
        (e.offsetX / e.target.offsetWidth) * this.$refs.video.duration;
      this.$refs.video.currentTime = scrubTime;

    },
    // 更新声音滑块的值
    handleRangeUpdate() {
      this.$refs.video["volume"] = this.volume;
      // console.log(this.volume);
    },
    // 跳过
    skip(val) {
      this.$refs.video.currentTime += parseFloat(val);
    },
  },

  computed: {
    videoLink() {
      return this.attrs.videoLink;
    },
    radius() {
      return this.attrs.videoBorderRadius;
    },
  },
};
</script>

<style lang="scss" scoped>
.videoContainer {
  width: 100%;
  overflow: hidden;
  border: 5px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
  font-size: 0;
  overflow: hidden;
  cursor: pointer;
  &:hover .controlers {
    transform: translateY(0);
  }
  &:hover .progress {
    height: 15px;
  }
  & > * {
    flex: 1;
  }

  .video {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
  .controlers {
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateY(100%) translateY(-5px);
    transition: all 0.3s;
    background: rgba(0, 0, 0, 0.1);

    .progress {
      flex: 10;
      position: relative;
      display: flex;
      flex-basis: 100%;
      height: 5px;
      transition: height 0.3s;
      background: rgba(0, 0, 0, 0.5);
      cursor: ew-resize;
      .progress_filled {
        /* width: 50%; */
        background: #ffc600;
        flex: 0;
      }
    }
    .controlers-buttons {
      display: flex;
      padding: 4px 4px;
      .left {
        display: flex;
        align-items: center;
        flex: 1;
        .player_button {
          margin-right: 10px;
          background: none;
          border: 0;
          color: white;
          outline: 0;
          padding: 0;
          cursor: pointer;
          max-width: 50px;
          &:hover {
            color: #ffc600;
          }
        }
        .player_slider {
          display: none;
          width: 100px;
          height: 20px;
        }
        .icon-yangshengqi {
          display: flex;
          align-items: center;
          &:hover {
            .player_slider {
              display: inline-block;
            }
          }
        }
      }

      .speed_button {
        background: none;
        white-space: nowrap;
        font-size: 16px;
        color: white;
        cursor: pointer;
        max-width: 50px;
        border: 0;
      }
    }
  }
}

input[type="range"] {
  -webkit-appearance: none;
  background: transparent;
  width: 100%;
  margin: 0 5px;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
    background: rgba(255, 255, 255, 0.8);
    border-radius: 1.3px;
    border: 0.2px solid rgba(1, 1, 1, 0);
  }
  &::-webkit-slider-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50px;
    background: #ffc600;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3.5px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  }
  &:focus::-webkit-slider-runnable-track {
    background: #bada55;
  }
  &::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
    background: #ffffff;
    border-radius: 1.3px;
    border: 0.2px solid rgba(1, 1, 1, 0);
  }
  &::-moz-range-thumb {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
    height: 15px;
    width: 15px;
    border-radius: 50px;
    background: #ffc600;
    cursor: pointer;
  }
}
</style>
