<template>
  <view class="container">
    <video
      :src="currentVideo.url"
      :poster="currentVideo.thumbnail"
      :initial-time="currentVideo.lastPlayedTime"
      @timeupdate="onTimeUpdate"
      @ended="onVideoEnded"
      :controls="false"
      :show-center-play-btn="false"
      :show-play-btn="false"
      :enable-progress-gesture="false"
      class="video-player"
      ref="videoPlayer"
    ></video>
    <view v-if="showControls" class="video-controls">
      <view class="top-controls">
        <button @click="goBack" class="control-btn">返回</button>
      </view>
      <view class="bottom-controls">
        <view class="progress-bar">
          <slider
            :value="progress"
            @change="onProgressChange"
            min="0"
            :max="currentVideo.duration"
            step="1"
            block-size="12"
            class="slider"
          />
          <text class="time-info">{{ formatTime(currentTime) }} / {{ formatTime(currentVideo.duration) }}</text>
        </view>
        <view class="control-buttons">
          <button @click="rewind" class="control-btn">快退</button>
          <button @click="togglePlay" class="control-btn">{{ isPlaying ? '暂停' : '播放' }}</button>
          <button @click="fastForward" class="control-btn">快进</button>
          <button @click="showVideoList" class="control-btn">其他视频</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
name:"videoplay",
  data() {
    return {
      videoPlayer: null,
      currentTime: 0,
      isPlaying: true,
      showControls: true,
      currentVideo: {
        id: 1,
        title: "示例视频 1",
        thumbnail: "/static/video-thumbnail-1.jpg",
        lastPlayedTime: 0,
        duration: 3600,
        url: "/static/video-1.mp4"
      }
    };
  },
  computed: {
    progress() {
      return (this.currentTime / this.currentVideo.duration) * 100;
    }
  },
  methods: {
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    onTimeUpdate(e) {
      this.currentTime = e.detail.currentTime;
    },
    onVideoEnded() {
      this.isPlaying = false;
    },
    onProgressChange(e) {
      const newTime = e.detail.value;
      this.videoPlayer.seek(newTime);
    },
    togglePlay() {
      if (this.isPlaying) {
        this.videoPlayer.pause();
      } else {
        this.videoPlayer.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    rewind() {
      this.videoPlayer.seek(Math.max(this.currentTime - 10, 0));
    },
    fastForward() {
      this.videoPlayer.seek(Math.min(this.currentTime + 10, this.currentVideo.duration));
    },
    showVideoList() {
      // 实现显示视频列表的逻辑
      uni.showActionSheet({
        itemList: ['视频 1', '视频 2', '视频 3'],
        success: (res) => {
          // 切换到选中的视频
          console.log('切换到视频:', res.tapIndex + 1);
        }
      });
    },
    goBack() {
      uni.navigateBack();
    }
  },
  mounted() {
    // 在实际应用中，您需要根据路由参数获取正确的视频信息
    // const videoId = parseInt(uni.getStorageSync('currentVideoId'));
    // this.currentVideo = getVideoById(videoId);
  }
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000;
}

.video-player {
  width: 100%;
  height: 100%;
}

.video-controls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
}

.top-controls {
  padding: 20px;
}

.bottom-controls {
  padding: 20px;
}

.progress-bar {
  margin-bottom: 10px;
}

.slider {
  width: 100%;
}

.time-info {
  color: #fff;
  font-size: 12px;
  text-align: center;
  display: block;
  margin-top: 5px;
}

.control-buttons {
  display: flex;
  justify-content: space-between;
}

.control-btn {
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
}
</style>


