<template>
	<view class="XQ">
		<view class="xq">
			<view class="xq_a">
				<view class="a_h">
					<view class="h_name">
						<text id="cdz_name">安智行龙湖天街充电桩</text>
					</view>
					<view class="h_work">
						<text id="cdz_work">空闲</text>
					</view>
				</view>
				<view class="a_b">
					<view class="img">
						<img id="IMG" src="https://ts1.cn.mm.bing.net/th/id/R-C.24c5b464bc455b5e29e02cecf2b4d82e?rik=lnO0z%2fIqZBWsmQ&riu=http%3a%2f%2fwww.hngy666.com%2fUploads%2f201910%2f5d9d9d7d1e1d7.jpg&ehk=3V0btb2QF2Dag%2f%2b461gbbsD%2buc5E6kVIB2PU0cKURzE%3d&risl=&pid=ImgRaw&r=0" alt="1" style="width: 100px;height:100px;border-radius: 10PX;"/>
					</view>
					<view class="desc">
						<view class="d_a">
							<text id="name_t">当前功率</text>
							<text id="KWH">22KW/H</text>
						</view>
						<view class="d_b">
							<text id="name_t">当前电压</text>
							<text id="FT">220V</text>
						</view>
					</view>
				</view>
			</view>
			<view class="xq_b">
				<view class="B_BU" id="BU_money">
					<button  type="primary" plain="true">20￥</button>
					<button  type="primary" plain="true">30￥</button>
					<button  type="primary" plain="true">50￥</button>
					<button  type="primary" plain="true">100￥</button>
					<button  type="primary" plain="true">全部</button>
				</view>
				<view class="b_bu_stater" id="BU_stater">
					<button type="primary">开始充电</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style lang="less" scoped>
	.XQ{
		display: flex;
		justify-content: center;
		.xq{
			margin-top: 10px;
			margin-bottom: 10px;
			border-radius: 10px;
			width: 700rpx;
			height: auto;
			box-shadow: 0 0 5px 1px #d1d1d1;
			padding: 5px;
			.xq_a{
				// background-color: aqua;
				height: auto;
				.a_h{
					display: flex;
					justify-content: space-between;
					height: auto;
					align-items: center;
					height: 40px;
					.h_name{
						// width: 80%;
						text{
							font-size: 20px;
							font-weight: bold;
						}
					}
					.h_work{
						padding: 5px;
						height: 25px;
						color: #ffffff;
						background-color:#13d113;
						border-radius: 10px;
						margin-right: 10px;
					}
				}
				.a_b{
					display: flex;
					margin-top: 10px;
					.img{
						width: 100px;
						height: 100px;
					}
					.desc{
						width: 100%;
						height: 100px;
						color: #000000;
						display: flex;
						margin-left: 10px;
						.d_a,.d_b{
							width: 50%;
							height: 50px;
							border-radius: 20px;
							// margin-right: 10px;
							background-color: #13d113;
							display: flex;
							flex-direction: column;
							justify-content: space-evenly;
							align-items: center;
							#name_t{
								font-weight: bold;
								font-size: 18px;
							}
						}
						.d_a{
							margin-right: 10px;
							#KWH{
								color: #ffffff;
							}
						}
						.d_b{
							#FT{
								color: #ffc634;
							}
						}
						
					}
				}
			}
			.xq_b{
				margin-top: 10px;
				// background-color:#d1d1d1;
				height: auto;
				display: flex;
				flex-direction: column;
				.B_BU{
					display: flex;
					flex-wrap: wrap;
					flex-grow: 1;
					justify-content: center;
					button{
						margin: 5px;
						display: flex;
						justify-content: center;
						align-items: center;
						width: 80px;
						height: 40px;
					}
				}
				.b_bu_stater{
					margin-top: 10px;
				}
			}
		}
	}

</style>
