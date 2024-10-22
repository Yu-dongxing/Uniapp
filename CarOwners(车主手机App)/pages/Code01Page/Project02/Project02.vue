<template>
  <view class="media-player">
    <view class="info-bar">
      <text class="track-name">{{ currentTrack.name }}</text>
      <text class="volume-text">音量: {{ volume }}%</text>
    </view>
    <view class="album-art"></view>
    <view class="progress-bar">
      <view class="progress" :style="{ width: `${progress}%` }"></view>
    </view>
    <view class="controls">
      <button @tap="previousTrack" class="control-btn">
        <view class="icon prev-icon"></view>
      </button>
      <button @tap="togglePlay" class="control-btn play-btn">
        <view :class="['icon', isPlaying ? 'pause-icon' : 'play-icon']"></view>
      </button>
      <button @tap="nextTrack" class="control-btn">
        <view class="icon next-icon"></view>
      </button>
    </view>
    <view class="volume-control">
      <button @tap="toggleMute" class="control-btn">
        <view :class="['icon', isMuted ? 'mute-icon' : 'volume-icon']"></view>
      </button>
      <slider 
        :value="volume" 
        @change="changeVolume" 
        min="0" 
        max="100" 
        class="volume-slider"
      ></slider>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
      isMuted: false,
      volume: 50,
      progress: 30, // Add this for the progress bar
      currentTrack: { name: '无正在播放的歌曲' },
      playlist: [
        { name: '歌曲1', artist: '艺术家1', album: '专辑1' },
        { name: '歌曲2', artist: '艺术家2', album: '专辑2' },
        { name: '歌曲3', artist: '艺术家3', album: '专辑3' },
      ],
      currentIndex: 0
    }
  },
  methods: {
    togglePlay() {
      this.isPlaying = !this.isPlaying
      // Actual play/pause logic
    },
    previousTrack() {
      this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
      this.currentTrack = this.playlist[this.currentIndex];
      // Actual logic to switch to the previous track
    },
    nextTrack() {
      this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
      this.currentTrack = this.playlist[this.currentIndex];
      // Actual logic to switch to the next track
    },
    changeVolume(e) {
      this.volume = e.detail.value
      // Actual volume change logic
    },
    toggleMute() {
      this.isMuted = !this.isMuted
      this.volume = this.isMuted ? 0 : 50
      // Actual mute/unmute logic
    }
  }
}
</script>

<style>
.media-player {
  background-color: #1e1e1e;
  margin: 20px auto;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  color: #ffffff;
}

.info-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.track-name {
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.volume-text {
  font-size: 14px;
  opacity: 0.7;
}

.album-art {
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  background-color: #333;
  border-radius: 10px;
  background-image: url('https://via.placeholder.com/200');
  background-size: cover;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.progress-bar {
  height: 4px;
  background-color: #333;
  border-radius: 2px;
  margin-bottom: 20px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #1db954;
  transition: width 0.3s ease;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.control-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  margin: 0 10px;
  transition: transform 0.2s ease;
}

.control-btn:hover {
  transform: scale(1.1);
}

.play-btn {
  font-size: 40px;
}

.volume-control {
  display: flex;
  align-items: center;
  justify-content: center;
}

.volume-slider {
  width: 150px;
  margin-left: 10px;
}

.icon {
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.play-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>');
}

.pause-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>');
}

.prev-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>');
}

.next-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>');
}

.volume-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>');
}

.mute-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>');
}
</style>