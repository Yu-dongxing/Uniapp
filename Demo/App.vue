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

<style>
	/*每个页面公共css */
	*{
		
	}
	a:link{
		text-decoration: none;
		color: #aaff00;
	}
	a:visited{
	}
	a:active{
		color: aqua;
	}
	:root{
		--index-header-height:50px;
		--index-footer-bored-radis:10px;
	}
/* 	.tab-bar {
	    display: flex;
	    justify-content: space-around;
	    background-color: #ffffff;
	    border-top: 0px solid #ccc;
	    padding: 10px 0;
	  }
	  .tab-bar-item {
	    flex: 1;
	    text-align: center;
	    color: #7A7E83;
	  }
	  .tab-bar-item.selected {
	    color: #3cc51f;
	  } */
	.uni-tabbar{
		backdrop-filter: blur(1px);
		/* filter: blur(5px); */
		/* background-color:rgba(255, 255, 255, 0.5); */
		border-top-right-radius: 30px;
		border-top-left-radius: 30px;
		
	}

/* 	.tab-bar {
	  color: #7A7E83;
	  font-size: 15px;
	  border-style: none;
	  background-color: rgba(255, 255, 255, 0.8);
	} */

</style>
