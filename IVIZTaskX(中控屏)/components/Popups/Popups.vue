<template>
  <view class="pop_ups">
    <view class="pop_ups-header">
      <text class="pop_ups-title">{{ title }}</text>
	  <view class="pop_ups-close" @click="close()">
		  <text>关闭</text>
	  </view>
    </view>
    <scroll-view scroll-y="true" class="pop_ups-content" style="height: 80%;"   >
			<slot></slot>
    </scroll-view>
	
  </view>
</template>

<script>
export default {
	name:"Popups",
	data() {
		return {
			isclose: true,
		}
	},
	props: {
		title: {
			type: String,
			required: true
		}
	},
	methods:{
		close(){
			this.isclose=!this.isclose;
			this.$emit("isclose",this.isclose);
			console.log(this.isclose);
		}
	},
	onLoad() {
		this.isclose=!this.isclose;
	}
}
</script>

<style lang="less">


.pop_ups {
--white: #ffffff;
--light-gray: #f8f9fa;
--gray: #e9ecef;
--green: #6bff89;
--dark-green: #4db963;
--title-color: #403e06;
--border-radius: 12px;
--box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
--transition: all 0.3s ease;
--header-padding: 16px 20px;
--close-button-size: 150px;
--close-button-height: 50px;
--close-button-radius: 20px;
--title-font-size: 30px;
--title-font-weight: 600;
--bg: hsla(217deg, 83%, 57%, .2);
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: var(--transition);
  height: 95vh;
  width: 95%;
  margin-left: 2.5%;
  display: flex;
  flex-direction: column;

  .pop_ups-header {
    background-color: var(--light-gray);
    padding: var(--header-padding);
    border-bottom: 1px solid var(--gray);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .pop_ups-title {
      font-size: var(--title-font-size);
      font-weight: var(--title-font-weight);
      color: var(--title-color);
    }

    .pop_ups-close {
      transition: var(--transition);
      width: var(--close-button-size);
      height: var(--close-button-height);
      border-radius: 1000px;
      background-color: var(--bg);
      display: flex;
      justify-content: center;
      align-items: center;

      text {
        line-height: var(--close-button-height);
        font-size: var(--title-font-size);
      }
    }

    .pop_ups-close:hover {
      background-color: var(--dark-green);
      color: var(--gray);
    }
  }

  .pop_ups-content {
    box-sizing: border-box;
    padding: 20px;
    flex-grow: 1;
  }
}
</style>