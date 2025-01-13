<template>
	<view class="video">
		<view class="video-back" @click="gotoback()">
			<text>返回</text>
		</view>
		<view class="video-item">
			<view class="item" v-for=" (item,index) in 10" @click="getplayinfo()">
				<view class="item-img">
				</view>
				<view class="item-desc">
					<view class="desc-title">
						<text>测试</text>
					</view>
					<view class="desc-playtime">
						<text>上次看到 xx 分 xx 秒</text>
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
				video:[
					
				]
			} 
		},
		methods: {
			getplayinfo(){
				uni.showActionSheet({
					itemList: ['主屏、副屏同时播放', '仅副屏播放'],
					success: function (res) {
						if(res.tapIndex == 0){
							uni.
							uni.navigateTo({
								url:"/pages/videoPlay/videoPlay"
							})
						}
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			},
			gotoback(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
.video{
    // margin-top: 10px;
	// background-color: #000000;
	// width: 100%;
	// height: 100%;
}
.video-back{
    width: 100px; /* 可根据需求调整 */
    height: 50px; /* 可根据需求调整 */
    background-color: aliceblue;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text{
        font-weight: bold;
    }
}
.video-back:active,.video-back:hover{
    background-color: #969696;
    text{
        
    }
}
.video-item{
    width: 90%; /* 宽度设为100%，使其充满父容器 */
    margin-top: 10px;
    // display: flex;
    // flex-wrap: wrap;
    // gap: 10px;
	display: grid;
	// grid-template-columns: repeat(4,1fr);
	grid-template-columns: repeat(auto-fill,minmax(400px,1fr));
	gap: 10px;
	
	margin-left: 5%;
    .item{
        // width: calc(25% - 10px); /* 每行显示两个，减去gap的一半 */
        height:300px; /* 可根据需求调整 */
        background-color: aliceblue;
        border-radius: 20px;
        box-sizing: border-box;
        padding: 5px;
		box-shadow: 1px 1px 5px 1px  #d5d5d5;
        .item-img{
            width: 100%;
            height: 70%;
        }
        .item-desc{
            width: 100%;
            height: 30%;
            .desc-title{
                height: 50%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px; /* 字体大小调整为相对较小的值 */
                font-weight: bold;
            }
            .desc-playtime{
                height: 50%;
                width: 100%;
                text-align: right; /* 使用text-align代替float */
                color: #969696;
                font-size: 14px; /* 字体大小调整为相对较小的值 */
            }
        }
    }
}
/* 媒体查询，针对不同屏幕宽度进行调整 */
@media (max-width: 768px) {
    .video-back{
        width: 80px; /* 在小屏幕设备上减小按钮宽度 */
        height: 40px; /* 在小屏幕设备上减小按钮高度 */
    }
    .video-item .item{
        width: 100%; /* 在小屏幕设备上每行显示一个 */
        height:200px; /* 在小屏幕设备上减小高度 */
    }
    .video-item .item .desc-title{
        font-size: 14px; /* 在小屏幕设备上减小字体大小 */
    }
    .video-item .item .desc-playtime{
        font-size: 12px; /* 在小屏幕设备上减小字体大小 */
    }
}
</style>
