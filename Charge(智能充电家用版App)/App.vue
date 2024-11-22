<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
@import '@/uni.scss';

/* 每个页面公共css */
page {
  background-color: $theme-background;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
    Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei',
    sans-serif;
}

/* 添加图标字体 */
@font-face {
  font-family: 'iconfont';
  src: url('/static/fonts/iconfont.ttf') format('truetype');
}

.iconfont {
  font-family: 'iconfont';
}

/* 定义图标 */
.icon-car:before {
  content: '\e600';
}
.icon-charging:before {
  content: '\e601';
}
.icon-charger:before {
  content: '\e602';
}
.icon-stop:before {
  content: '\e603';
}
.icon-car-large:before {
  content: '\e604';
}
</style>
