import { defineStore } from 'pinia'

export const useVehicleStore = defineStore('vehicle', {
  state: () => ({
    currentVehicle: null,
    chargingStatus: {
      isCharging: false,
      batteryLevel: 30,
      chargingPower: 7.2,
      chargedAmount: 0,
      remainingTime: 120,
      chargerName: '家用充电桩',
      isConnected: true
    },
    vehicleList: []
  }),
  
  actions: {
    addVehicle(vehicle) {
      this.vehicleList.push(vehicle)
      uni.setStorageSync('vehicleList', this.vehicleList)
      if (!this.currentVehicle) {
        this.setCurrentVehicle(vehicle)
      }
    },
    
    setCurrentVehicle(vehicle) {
      this.currentVehicle = vehicle
      uni.setStorageSync('currentVehicle', vehicle)
    },
    
    startCharging() {
      this.chargingStatus.isCharging = true
      this.startStatusUpdate()
      this.saveChargingStatus()
    },
    
    stopCharging() {
      this.chargingStatus.isCharging = false
      this.stopStatusUpdate()
      this.saveChargingStatus()
      
      this.addChargingRecord({
        date: new Date().toISOString(),
        chargedAmount: this.chargingStatus.chargedAmount,
        duration: this.getChargingDuration(),
        vehicleInfo: this.currentVehicle
      })
    },
    
    startStatusUpdate() {
      this.statusInterval = setInterval(() => {
        if (this.chargingStatus.batteryLevel < 100) {
          this.chargingStatus.batteryLevel = Math.min(
            this.chargingStatus.batteryLevel + 0.1, 
            100
          )
          
          this.chargingStatus.chargedAmount += this.chargingStatus.chargingPower / 3600
          
          this.chargingStatus.remainingTime = Math.max(
            0,
            Math.round((100 - this.chargingStatus.batteryLevel) * 1.2)
          )
          
          this.saveChargingStatus()
        } else {
          this.stopCharging()
        }
      }, 1000)
    },
    
    stopStatusUpdate() {
      if (this.statusInterval) {
        clearInterval(this.statusInterval)
      }
    },
    
    saveChargingStatus() {
      uni.setStorageSync('chargingStatus', this.chargingStatus)
    },
    
    loadChargingStatus() {
      const savedStatus = uni.getStorageSync('chargingStatus')
      if (savedStatus) {
        this.chargingStatus = savedStatus
        if (this.chargingStatus.isCharging) {
          this.startStatusUpdate()
        }
      }
    },
    
    addChargingRecord(record) {
      const records = uni.getStorageSync('chargingRecords') || []
      records.unshift(record)
      uni.setStorageSync('chargingRecords', records)
    },
    
    getChargingDuration() {
      return Math.round(this.chargingStatus.chargedAmount * 60 / this.chargingStatus.chargingPower)
    },
    
    init() {
      const savedVehicles = uni.getStorageSync('vehicleList')
      if (savedVehicles) {
        this.vehicleList = savedVehicles
      }
      
      const savedCurrentVehicle = uni.getStorageSync('currentVehicle')
      if (savedCurrentVehicle) {
        this.currentVehicle = savedCurrentVehicle
      }
      
      this.loadChargingStatus()
    }
  }
}) 