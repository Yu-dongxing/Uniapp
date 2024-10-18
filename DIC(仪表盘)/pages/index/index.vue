<template>
  <view class="container">
    <!-- 顶部信息显示 -->
    <view class="top-info">
      <text>￥0</text>
      <text>2月12日 周四 12:22</text>
      <text>电费：0</text>
    </view>

    <!-- 仪表盘部分 -->
    <view class="circle-container">
      <!-- 左侧：转速表 -->
      <canvas canvas-id="speedCircle" class="speed-circle"></canvas>

      <!-- 中间：导航信息 -->
      <view class="navigation-info">
        <text class="direction">302米直行</text>
        <text class="road">进入人民路</text>
        <image class="map-image" src="/static/map.png"></image> <!-- 地图占位符 -->
      </view>

      <!-- 右侧：功率图 -->
      <canvas canvas-id="powerCircle" class="power-circle"></canvas>
    </view>

    <!-- 底部信息显示 -->
    <view class="bottom-info">
      <text>剩余电量: 256KM</text>
      <text>ECO+</text>
      <view class="gear-info">
        <text>P</text>
        <text>R</text>
        <text>N</text>
        <text>D</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onReady() {
    this.drawSpeedCircle(); // 绘制转速表
    this.drawPowerCircle(); // 绘制功率表
  },
  methods: {
    // 绘制转速表
    drawSpeedCircle() {
      const ctx = uni.createCanvasContext('speedCircle');
      const centerX = 150, centerY = 150, radius = 120;
      ctx.setLineWidth(10);
      ctx.setStrokeStyle('#ffffff');
      
      // 绘制圆环
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 0.25 * Math.PI, false);
      ctx.stroke();

      // 显示 RPM 和电压信息
      ctx.setFontSize(30);
      ctx.setFillStyle('#ffffff');
      ctx.fillText('24', centerX - 20, centerY - 10);
      ctx.setFontSize(14);
      ctx.fillText('R/MIN X 100', centerX - 40, centerY + 20);
      ctx.fillText('工作电压 394V', centerX - 60, centerY + 50);
      ctx.fillText('工作电流 6.2A', centerX - 60, centerY + 70);
      
      ctx.draw();
    },
    // 绘制功率图
    drawPowerCircle() {
      const ctx = uni.createCanvasContext('powerCircle');
      const centerX = 150, centerY = 150, radius = 120;
      ctx.setLineWidth(10);
      ctx.setStrokeStyle('#ffffff');

      // 绘制圆环
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 0.25 * Math.PI, false);
      ctx.stroke();

      // 模拟功率数据图形
      ctx.setLineWidth(3);
      ctx.setStrokeStyle('#00ff00');
      ctx.beginPath();
      ctx.moveTo(60, centerY);
      ctx.lineTo(90, centerY - 30);
      ctx.lineTo(120, centerY);
      ctx.lineTo(150, centerY - 40);
      ctx.lineTo(180, centerY + 20);
      ctx.stroke();

      // 显示功率信息
      ctx.setFontSize(14);
      ctx.setFillStyle('#ffffff');
      ctx.fillText('平均 227 Wh/km', centerX - 40, centerY + 50);
      ctx.fillText('最近 50 km', centerX - 40, centerY + 70);
      
      ctx.draw();
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
  height: 100%;
  color: #fff;
}

.top-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.circle-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.speed-circle, .power-circle {
  width: 300px;
  height: 300px;
  margin: 20px;
}

.navigation-info {
  width: 300px;
  text-align: center;
}

.map-image {
  width: 100%;
  height: 100px;
}

.bottom-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.gear-info {
  display: flex;
  justify-content: space-around;
  width: 30%;
}
</style>
