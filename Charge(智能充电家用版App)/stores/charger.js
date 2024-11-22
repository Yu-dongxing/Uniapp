import { defineStore } from 'pinia'

export const useChargerStore = defineStore('charger', {
  state: () => ({
    chargerList: [],
    currentCharger: null
  }),
  
  actions: {
    addCharger(charger) {
      this.chargerList.push(charger)
    },
    
    setCurrentCharger(charger) {
      this.currentCharger = charger
    },
    
    updateChargerStatus(chargerId, status) {
      const charger = this.chargerList.find(c => c.id === chargerId)
      if (charger) {
        charger.status = status
      }
    }
  }
}) 