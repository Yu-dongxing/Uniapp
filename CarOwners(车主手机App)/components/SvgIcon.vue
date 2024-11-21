<template>
  <view 
    class="svg-icon" 
    :class="[`icon-${name}`, { 'with-hover': withHover }]"
    :style="{ 
      width: size + 'rpx', 
      height: size + 'rpx'
    }"
  >
    <image 
      :src="getIconPath()" 
      mode="aspectFit"
      :style="{ 
        width: size + 'rpx', 
        height: size + 'rpx',
        filter: getColorFilter()
      }"
    />
  </view>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'common',
      validator: (value) => {
        return ['nav', 'common', 'services', 'status'].includes(value)
      }
    },
    size: {
      type: [Number, String],
      default: 32
    },
    color: {
      type: String,
      default: ''
    },
    withHover: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getIconPath() {
      return `/static/icons/${this.type}/${this.name}.svg`
    },
    getColorFilter() {
      const color = this.getIconColor();
      if (!color.startsWith('#')) return '';
      
      // 将十六进制颜色转换为RGB
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      
      // 计算相对亮度
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      
      // 计算滤镜值
      return `brightness(0) saturate(100%) invert(${brightness / 255})`;
    },
    getIconColor() {
      if (this.color) {
        return this.color;
      }
      
      // 默认主题色
      const themeColor = '#4CAF50';
      
      // 特定图标的颜色映射
      const colorMap = {
        search: '#999999',
        more: '#607D8B'
      };
      
      // 根据图标类型设置不同的默认颜色
      if (this.type === 'services') {
        return themeColor;
      }
      
      return colorMap[this.name] || themeColor;
    }
  }
}
</script>

<style lang="scss">
.svg-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  image {
    display: block;
    transition: transform 0.3s ease;
    will-change: filter;
  }
  
  &.with-hover {
    &:active {
      transform: scale(0.95);
      opacity: 0.8;
    }
  }
}
</style> 