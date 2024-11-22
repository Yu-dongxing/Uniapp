<template>
  <view class="add-charger">
    <form @submit="handleSubmit">
      <view class="form-item">
        <text class="label">充电桩名称</text>
        <input type="text" 
               v-model="formData.name" 
               placeholder="请输入充电桩名称"/>
      </view>
      
      <view class="form-item">
        <text class="label">充电功率(kW)</text>
        <input type="number" 
               v-model="formData.power" 
               placeholder="请输入充电功率"/>
      </view>
      
      <view class="form-item">
        <text class="label">连接方式</text>
        <picker :range="connectionTypes" 
                @change="onConnectionTypeChange"
                :value="connectionTypeIndex">
          <view class="picker-value">
            {{ formData.connectionType || '请选择连接方式' }}
          </view>
        </picker>
      </view>
      
      <button class="submit-btn" 
              form-type="submit"
              :disabled="!isFormValid">添加充电桩</button>
    </form>
  </view>
</template>

<script>
import { ref, computed } from 'vue'
import { useChargerStore } from '@/stores/charger'

export default {
  setup() {
    const chargerStore = useChargerStore()
    const formData = ref({
      name: '',
      power: '',
      connectionType: '',
      status: 'offline' // online, offline
    })
    
    const connectionTypeIndex = ref(-1)
    const connectionTypes = ['交流慢充', '直流快充']
    
    const isFormValid = computed(() => {
      return formData.value.name && 
             formData.value.power &&
             formData.value.connectionType
    })
    
    return {
      formData,
      connectionTypes,
      connectionTypeIndex,
      isFormValid,
      chargerStore
    }
  },
  
  methods: {
    onConnectionTypeChange(e) {
      this.connectionTypeIndex = e.detail.value
      this.formData.connectionType = this.connectionTypes[e.detail.value]
    },
    
    handleSubmit() {
      // 添加充电桩到store
      this.chargerStore.addCharger({
        ...this.formData,
        id: Date.now().toString()
      })
      
      uni.showToast({
        title: '添加成功',
        icon: 'success'
      })
      
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    }
  }
}
</script>

<style lang="scss">
.add-charger {
  padding: 30rpx;
  
  .form-item {
    margin-bottom: 30rpx;
    
    .label {
      display: block;
      margin-bottom: 10rpx;
      color: #333;
      font-size: 28rpx;
    }
    
    input, .picker-value {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      padding: 0 20rpx;
      background: #f5f5f5;
      border-radius: 8rpx;
    }
  }
  
  .submit-btn {
    margin-top: 60rpx;
    background: $theme-primary;
    color: #fff;
    
    &:disabled {
      opacity: 0.5;
    }
  }
}
</style> 