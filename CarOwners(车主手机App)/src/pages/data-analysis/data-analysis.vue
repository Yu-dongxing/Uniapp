<template>
  <view class="container">
    <!-- 柱状图分析 -->
    <view class="chart-section">
      <view class="section-header">
        <text class="title">充电数据分析</text>
        <text class="subtitle">2023年上半年</text>
      </view>
      <view class="chart-container">
        <qiun-data-charts 
          type="column"
          :opts="barOpts"
          :chartData="barData"
        />
      </view>
    </view>

    <!-- 折线图分析 -->
    <view class="chart-section">
      <view class="section-header">
        <text class="title">耗电量分析</text>
        <text class="subtitle">2023年3月/5月</text>
      </view>
      <view class="chart-container">
        <qiun-data-charts 
          type="line"
          :opts="lineOpts"
          :chartData="lineData"
        />
      </view>
    </view>

    <!-- 数据详情 -->
    <view class="data-details">
      <view class="detail-card">
        <text class="card-title">本月数据统计</text>
        <view class="data-grid">
          <view class="data-item">
            <text class="value">{{ currentMonthData.chargeTimes }}</text>
            <text class="label">充电次数</text>
          </view>
          <view class="data-item">
            <text class="value">{{ currentMonthData.powerConsumption }}kWh</text>
            <text class="label">充电量</text>
          </view>
          <view class="data-item">
            <text class="value">¥{{ currentMonthData.cost }}</text>
            <text class="label">充电花费</text>
          </view>
          <view class="data-item">
            <text class="value">{{ currentMonthData.mileage }}km</text>
            <text class="label">行驶里程</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 柱状图配置
      barOpts: {
        color: ['#4CAF50', '#2196F3', '#FF9800'],
        padding: [15, 15, 0, 5],
        legend: {
          show: true,
          position: 'bottom',
          itemWidth: 15,
          itemGap: 20
        },
        xAxis: {
          disableGrid: true,
          fontColor: '#666666'
        },
        yAxis: {
          gridType: 'dash',
          dashLength: 2,
          splitNumber: 5,
          fontColor: '#666666',
          min: 0
        },
        extra: {
          column: {
            type: 'group',
            width: 20,
            activeBgColor: '#000000',
            activeBgOpacity: 0.08
          }
        }
      },
      // 柱状图数据
      barData: {
        categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
        series: [
          {
            name: '充电次数',
            data: [12, 15, 18, 14, 16, 20]
          },
          {
            name: '充电量(kWh)',
            data: [240, 300, 360, 280, 320, 400]
          },
          {
            name: '花费(¥)',
            data: [192, 240, 288, 224, 256, 320]
          },
        ]
      },
      // 折线图配置
      lineOpts: {
        color: ['#4CAF50', '#2196F3', '#FF9800'],
        padding: [15, 15, 0, 5],
        legend: {
          show: true,
          position: 'bottom',
          itemWidth: 15,
          itemGap: 20
        },
        xAxis: {
          disableGrid: false,
          fontColor: '#666666'
        },
        yAxis: {
          gridType: 'dash',
          dashLength: 2,
          splitNumber: 5,
          fontColor: '#666666',
          min: 0
        },
        extra: {
          line: {
            type: 'straight',
            width: 2,
            activeType: 'hollow'
          }
        }
      },
      // 折线图数据
      lineData: {
        categories: ['3月', '5月'],
        series: [
          {
            name: '耗电量(kWh)',
            data: [360, 320]
          },
          {
            name: '行驶里程(km)',
            data: [2000, 1800]
          },
          {
            name: '百公里耗电(kWh/100km)',
            data: [18, 17.8]
          }
        ]
      },
      // 当月数据统计
      currentMonthData: {
        chargeTimes: 20,
        powerConsumption: 400,
        cost: 320,
        mileage: 2200
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 30rpx;
}

.chart-section {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.06);

  .section-header {
    margin-bottom: 20rpx;

    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      display: block;
    }

    .subtitle {
      font-size: 24rpx;
      color: #999;
      margin-top: 6rpx;
    }
  }

  .chart-container {
    height: 600rpx;
    width: 100%;
  }
}

.data-details {
  .detail-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.06);

    .card-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 30rpx;
      display: block;
    }

    .data-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30rpx;

      .data-item {
        text-align: center;
        padding: 20rpx;
        background: #f8f9fa;
        border-radius: 16rpx;

        .value {
          font-size: 36rpx;
          color: #4CAF50;
          font-weight: bold;
          display: block;
          margin-bottom: 10rpx;
          font-family: 'DIN Alternate', sans-serif;
        }

        .label {
          font-size: 26rpx;
          color: #666;
        }
      }
    }
  }
}
</style> 