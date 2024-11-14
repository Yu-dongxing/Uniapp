<template>
  <div class="weather-display">
    <div class="content-wrapper">
      <div class="current-weather">
        <h1 class="city-name">{{ currentCity }}</h1>
        <div class="weather-condition">
          <i :class="getWeatherIcon(currentWeather.condition)"></i>
          <span>{{ currentWeather.condition }}</span>
        </div>
        <div class="temperature">
          <span class="max-temp">{{ currentWeather.maxTemp }}°C</span>
          <span class="min-temp">{{ currentWeather.minTemp }}°C</span>
        </div>
      </div>

      <div class="weather-details">
        <div class="detail">
          <i class="icon-humidity"></i>
          <span>湿度: {{ currentWeather.humidity }}%</span>
        </div>
        <div class="detail">
          <i class="icon-wind"></i>
          <span>风速: {{ currentWeather.windSpeed }} km/h</span>
        </div>
      </div>
	  
      <div class="city-list">
        <label for="city-select">选择城市:</label>
        <select id="city-select" v-model="cityIndex" @change="changeCity">
          <option v-for="(city, index) in cities" :key="index" :value="index">
            {{ city }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentCity: '北京',
      cityIndex: 0,
      cities: ['北京', '上海', '广州', '深圳'],
      currentWeather: {
        condition: '晴天',
        maxTemp: 30,
        minTemp: 20,
        humidity: 65,
        windSpeed: 5
      }
    }
  },
  methods: {
    changeCity(e) {
      this.cityIndex = parseInt(e.target.value)
      this.currentCity = this.cities[this.cityIndex]
      this.fetchWeatherData()
    },
    fetchWeatherData() {
      // 这里应该是一个实际的API调用来获取天气数据
      // 为了演示,我们使用模拟数据
      this.currentWeather = {
        condition: ['晴天', '多云', '雨天'][Math.floor(Math.random() * 3)],
        maxTemp: Math.floor(Math.random() * 15) + 25,
        minTemp: Math.floor(Math.random() * 10) + 15,
        humidity: Math.floor(Math.random() * 30) + 50,
        windSpeed: Math.floor(Math.random() * 10) + 1
      }
    },
    getWeatherIcon(condition) {
      switch (condition) {
        case '晴天':
          return 'icon-sun'
        case '多云':
          return 'icon-cloud'
        case '雨天':
          return 'icon-rain'
        default:
          return 'icon-sun'
      }
    }
  },
  mounted() {
    this.fetchWeatherData()
  }
}
</script>

<style scoped>
.weather-display {
  font-family: 'Arial', sans-serif;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6dd5ed, #2193b0);
  color: #fff;
}

.content-wrapper {
  width: 80%;
  max-width: 1200px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.current-weather {
  text-align: center;
}

.city-name {
  font-size: 5em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.weather-condition {
  font-size: 3em;
  margin-bottom: 40px;
}

.weather-condition i {
  font-size: 2em;
  margin-right: 20px;
}

.temperature {
  font-size: 4em;
}

.max-temp {
  color: #ff6b6b;
  margin-right: 20px;
}

.min-temp {
  color: #4ecdc4;
}

.weather-details {
  display: flex;
  justify-content: space-around;
  font-size: 2em;
  margin-bottom: 40px;
}

.detail {
  display: flex;
  align-items: center;
}

.detail i {
  font-size: 1.5em;
  margin-right: 20px;
}

.city-list {
  text-align: center;
}

label {
  display: block;
  margin-bottom: 20px;
  font-size: 2em;
}

select {
  width: 50%;
  padding: 20px;
  font-size: 1.5em;
  border: none;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #000000;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

select:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.3);
}

select:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

/* Icons (you would need to replace these with actual icon fonts or SVGs) */
.icon-sun::before { content: '☀️'; }
.icon-cloud::before { content: '☁️'; }
.icon-rain::before { content: '🌧️'; }
.icon-humidity::before { content: '💧'; }
.icon-wind::before { content: '💨'; }

@media (max-width: 1600px) {
  .content-wrapper {
    width: 90%;
  }
  .city-name {
    font-size: 4em;
  }
  .weather-condition, .temperature {
    font-size: 3em;
  }
  .weather-details {
    font-size: 1.5em;
  }
  label {
    font-size: 1.5em;
  }
  select {
    font-size: 1.2em;
  }
}

@media (max-width: 1200px) {
  .content-wrapper {
    width: 95%;
    padding: 30px;
  }
  .city-name {
    font-size: 3em;
  }
  .weather-condition, .temperature {
    font-size: 2.5em;
  }
  .weather-details {
    font-size: 1.2em;
  }
  label {
    font-size: 1.2em;
  }
  select {
    width: 70%;
    font-size: 1em;
  }
}
</style>