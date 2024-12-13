<template>
  <view class="custom-card">
    <view class="custom-card-header">
      <text class="custom-card-title">{{ title }}</text>
    </view>
    <view class="custom-card-content">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CustomCard',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.custom-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.custom-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12);
}

.custom-card-header {
  background-color: #f8f9fa;
  padding: 16px 20px;
  border-bottom: 1px solid #e9ecef;
}

.custom-card-title {
  font-size: 18px;
  font-weight: 600;
  color: #343a40;
}

.custom-card-content {
  padding: 20px;
  flex-grow: 1;
}
</style>

