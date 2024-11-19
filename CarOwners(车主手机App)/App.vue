<script>
export default {
  setup() {
    const onLaunch = () => {
      console.log('App Launch')
    }
    
    const onShow = () => {
      console.log('App Show')
    }
    
    const onHide = () => {
      console.log('App Hide')
    }

    return {
      onLaunch,
      onShow,
      onHide
    }
  }
}
</script>

<style>
/*每个页面公共css */
page {
  background-color: #f5f5f5;
}
</style> 