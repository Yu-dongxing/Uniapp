<template>
  <view class="carinfo_container">
    <view class="page-title">车辆信息</view>
    <view class="cards-container">
      <CustomCard title="基本信息">
        <view class="info-item">
          <text class="label">车主姓名:</text>
          <text class="value">{{ basicInfo.ownerName }}</text>
        </view>
        <view class="info-item">
          <text class="label">车辆品牌:</text>
          <text class="value">{{ basicInfo.brand }}</text>
        </view>
        <view class="info-item">
          <text class="label">车架号:</text>
          <text class="value">{{ basicInfo.vin }}</text>
        </view>
      </CustomCard>

      <CustomCard title="电动机信息">
        <view class="info-item">
          <text class="label">总功率:</text>
          <text class="value">{{ motorInfo.totalPower }}</text>
        </view>
        <view class="info-item">
          <text class="label">总扭矩:</text>
          <text class="value">{{ motorInfo.totalTorque }}</text>
        </view>
      </CustomCard>

      <CustomCard title="电池信息">
        <view class="info-item">
          <text class="label">电池容量:</text>
          <text class="value">{{ batteryInfo.capacity }}</text>
        </view>
        <view class="info-item">
          <text class="label">电池品牌:</text>
          <text class="value">{{ batteryInfo.brand }}</text>
        </view>
        <view class="info-item">
          <text class="label">百公里耗电量:</text>
          <text class="value">{{ batteryInfo.consumption }}</text>
        </view>
      </CustomCard>

      <CustomCard title="车身信息">
        <view class="info-item">
          <text class="label">长宽高:</text>
          <text class="value">{{ bodyInfo.dimensions }}</text>
        </view>
        <view class="info-item">
          <text class="label">轴距:</text>
          <text class="value">{{ bodyInfo.wheelbase }}</text>
        </view>
        <view class="info-item">
          <text class="label">前后轮距:</text>
          <text class="value">{{ bodyInfo.trackWidth }}</text>
        </view>
        <view class="info-item">
          <text class="label">整备质量:</text>
          <text class="value">{{ bodyInfo.curbWeight }}</text>
        </view>
        <view class="info-item">
          <text class="label">后备厢容积:</text>
          <text class="value">{{ bodyInfo.trunkVolume }}</text>
        </view>
      </CustomCard>

      <CustomCard title="底盘/转向信息">
        <view class="info-item">
          <text class="label">驱动形式:</text>
          <text class="value">{{ chassisInfo.driveType }}</text>
        </view>
        <view class="info-item">
          <text class="label">前悬挂类型:</text>
          <text class="value">{{ chassisInfo.frontSuspension }}</text>
        </view>
        <view class="info-item">
          <text class="label">后悬挂类型:</text>
          <text class="value">{{ chassisInfo.rearSuspension }}</text>
        </view>
        <view class="info-item">
          <text class="label">转向助力形式:</text>
          <text class="value">{{ chassisInfo.steeringType }}</text>
        </view>
      </CustomCard>

      <CustomCard title="车轮/制动信息">
        <view class="info-item">
          <text class="label">前制动器类型:</text>
          <text class="value">{{ wheelInfo.frontBrake }}</text>
        </view>
        <view class="info-item">
          <text class="label">后制动器类型:</text>
          <text class="value">{{ wheelInfo.rearBrake }}</text>
        </view>
        <view class="info-item">
          <text class="label">驻车制动类型:</text>
          <text class="value">{{ wheelInfo.parkingBrake }}</text>
        </view>
        <view class="info-item">
          <text class="label">前轮胎规格:</text>
          <text class="value">{{ wheelInfo.frontTireSpec }}</text>
        </view>
        <view class="info-item">
          <text class="label">后轮胎规格:</text>
          <text class="value">{{ wheelInfo.rearTireSpec }}</text>
        </view>
        <view class="info-item">
          <text class="label">轮毂材质:</text>
          <text class="value">{{ wheelInfo.wheelMaterial }}</text>
        </view>
        <view class="info-item">
          <text class="label">备胎规格:</text>
          <text class="value">{{ wheelInfo.spareTireSpec }}</text>
        </view>
      </CustomCard>
    </view>
  </view>
</template>

<script>
import CustomCard from "@/components/CustomCard/CustomCard.vue";

export default {
  name:"CarInfo",
  components: {
    CustomCard
  },
  data() {
    return {
      basicInfo: {
        ownerName: 'yudongxing',
        brand: '特斯拉',
        vin: 'LSVDH3B27EN123456'
      },
      motorInfo: {
        totalPower: '250kW',
        totalTorque: '450Nm'
      },
      batteryInfo: {
        capacity: '75kWh',
        brand: '松下',
        consumption: '15.6kWh/100km'
      },
      bodyInfo: {
        dimensions: '4694*1849*1443mm',
        wheelbase: '2875mm',
        trackWidth: '1580/1587mm',
        curbWeight: '1844kg',
        trunkVolume: '425L'
      },
      chassisInfo: {
        driveType: '后轮驱动',
        frontSuspension: '双叉臂式独立悬挂',
        rearSuspension: '多连杆式独立悬挂',
        steeringType: '电动助力'
      },
      wheelInfo: {
        frontBrake: '通风盘式',
        rearBrake: '通风盘式',
        parkingBrake: '电子驻车',
        frontTireSpec: '235/45 R18',
        rearTireSpec: '235/45 R18',
        wheelMaterial: '铝合金',
        spareTireSpec: '无'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.carinfo_container {
  padding: 25rpx;
  // background-color: #5d5e5f;
  min-height: 100vh;
  .page-title {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 24rpx;
    text-align: center;
	background-color: #2a2a2a;
	border-radius: 10px;
	box-sizing: border-box;
	padding: 10px;
  }
  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24rpx;
  }
}





.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16rpx;
  padding: 8rpx 0;
  border-bottom: 1px solid #e9ecef;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  color: #495057;
  font-size: 14px;
}

.value {
  color: #212529;
  font-weight: 500;
  font-size: 14px;
  text-align: right;
}

@media screen and (max-width: 600px) {
  .cards-container {
    grid-template-columns: 1fr;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .label, .value {
    width: 100%;
  }

  .value {
    text-align: left;
    margin-top: 4rpx;
  }
}
</style>



