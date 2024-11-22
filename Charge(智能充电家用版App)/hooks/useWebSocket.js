export function useWebSocket() {
  let ws = null
  
  const connect = (url) => {
    return new Promise((resolve, reject) => {
      ws = uni.connectSocket({
        url,
        success: () => {
          resolve()
        },
        fail: (error) => {
          reject(error)
        }
      })
      
      ws.onOpen(() => {
        console.log('WebSocket连接已建立')
      })
      
      ws.onError((error) => {
        console.error('WebSocket错误:', error)
      })
      
      ws.onMessage((message) => {
        // 处理接收到的消息
        handleMessage(JSON.parse(message.data))
      })
    })
  }
  
  const send = (data) => {
    return new Promise((resolve, reject) => {
      if (!ws) {
        reject(new Error('WebSocket未连接'))
        return
      }
      
      ws.send({
        data: JSON.stringify(data),
        success: () => {
          resolve()
        },
        fail: (error) => {
          reject(error)
        }
      })
    })
  }
  
  const handleMessage = (message) => {
    // 处理不同类型的消息
    switch (message.type) {
      case 'CHARGING_STATUS':
        // 更新充电状态
        break
      case 'CONNECTION_STATUS':
        // 更新连接状态
        break
      default:
        console.log('未知消息类型:', message)
    }
  }
  
  return {
    connect,
    send
  }
} 