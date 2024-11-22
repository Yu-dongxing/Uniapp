<template>
  <view class="add-vehicle">
    <form @submit="handleSubmit">
      <view class="form-item">
        <text class="label">车牌号码</text>
        <input type="text" 
               v-model="formData.plateNumber" 
               placeholder="请输入车牌号码"/>
      </view>
      
      <view class="form-item">
        <text class="label">品牌</text>
        <picker :range="carBrands" 
                @change="onBrandChange"
                :value="brandIndex">
          <view class="picker-value">
            {{ formData.brand || '请选择品牌' }}
          </view>
        </picker>
      </view>
      
      <view class="form-item">
        <text class="label">型号</text>
        <picker :range="carModels" 
                @change="onModelChange"
                :value="modelIndex"
                :disabled="!formData.brand">
          <view class="picker-value">
            {{ formData.model || '请选择型号' }}
          </view>
        </picker>
      </view>
      
      <view class="form-item">
        <text class="label">续航里程(km)</text>
        <input type="number" 
               v-model="formData.range" 
               placeholder="请输入续航里程"/>
      </view>
      
      <button class="submit-btn" 
              form-type="submit"
              :disabled="!isFormValid">添加车辆</button>
    </form>
  </view>
</template>

<script>
import { ref, computed } from 'vue'
import { useVehicleStore } from '@/stores/vehicle'

export default {
  setup() {
    const vehicleStore = useVehicleStore()
    const formData = ref({
      plateNumber: '',
      brand: '',
      model: '',
      range: '',
      modelUrl: ''
    })
    
    const brandIndex = ref(-1)
    const modelIndex = ref(-1)
    
    const carBrands = ['特斯拉', '比亚迪', '小鹏', '蔚来']
    const carModelsMap = {
      '特斯拉': ['Model 3', 'Model Y', 'Model S', 'Model X'],
      '比亚迪': ['汉', '唐', '秦', '海豚'],
      '小鹏': ['P7', 'G3', 'P5'],
      '蔚来': ['ET7', 'ES6', 'EC6']
    }
    
    const carModels = computed(() => {
      return formData.value.brand ? carModelsMap[formData.value.brand] : []
    })
    
    const isFormValid = computed(() => {
      return formData.value.plateNumber && 
             formData.value.brand &&
             formData.value.model &&
             formData.value.range
    })
    
    return {
      formData,
      carBrands,
      carModels,
      brandIndex,
      modelIndex,
      isFormValid,
      vehicleStore
    }
  },
  
  methods: {
    onBrandChange(e) {
      this.brandIndex = e.detail.value
      this.formData.brand = this.carBrands[e.detail.value]
      this.formData.model = ''
      this.modelIndex = -1
      // 设置对应的3D模型URL
      this.formData.modelUrl = `/static/3d-models/${this.formData.brand}.glb`
    },
    
    onModelChange(e) {
      this.modelIndex = e.detail.value
      this.formData.model = this.carModels[e.detail.value]
    },
    
    handleSubmit() {
      // 添加车辆到store
      this.vehicleStore.addVehicle({
        ...this.formData,
        id: Date.now().toString()
      })
      
      uni.showToast({
        title: '添加成功',
        icon: 'success'
      })
      
      // 返回首页
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    }
  }
}
</script>

<style lang="scss">
.add-vehicle {
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