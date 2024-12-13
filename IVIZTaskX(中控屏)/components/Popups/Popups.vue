<template>
  <view class="pop_ups">
    <view class="pop_ups-header">
      <text class="pop_ups-title">{{ title }}</text>
	  <view class="pop_ups-close">
		  <text>关闭</text>
	  </view>
    </view>
    <scroll-view scroll-y="true" class="pop_ups-content" style="height: 80%;"   >
			<slot></slot>
    </scroll-view>
	<view class="pop_ups-close"></view>
  </view>
</template>

<script>
export default {
	name:"Popups",
	props: {
		title: {
			type: String,
			required: true
		}
	}
}
</script>

<style lang="less">
.pop_ups {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 95vh;
  width: 95%;
  margin-left: 2.5%;
  display: flex;
  flex-direction: column;
  .pop_ups-header {
    background-color: #f8f9fa;
    padding: 16px 20px;
    border-bottom: 1px solid #e9ecef;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.pop_ups-title {
	  font-size: 30px;
	  font-weight: 600;
	  color: #403e06;
	}
	.pop_ups-close{
		  width: 150px;
		  height: 50px;
		  border-radius: 20px;
		  background-color:#6bff89;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  text{
			  line-height: 50px;
			  font-size: 30px;
		  }
	}
  }
  .pop_ups-content {
	box-sizing: border-box;
	padding: 20px;
	flex-grow: 1;
  }
  
}

// .pop_ups:hover {
//   transform: translateY(-2px);
//   box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12);
// }






</style>