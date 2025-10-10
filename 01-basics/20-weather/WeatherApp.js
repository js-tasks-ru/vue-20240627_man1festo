import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = getWeatherData();
    const weatherConditionIcons = WeatherConditionIcons;

    function isNight(dt, sunrise, sunset) {
      const dtDate = new Date().setHours(dt.split(':')[0], dt.split(':')[1])
      const sunriseDate = new Date().setHours(sunrise.split(':')[0], sunrise.split(':')[1])
      const sunsetDate = new Date().setHours(sunset.split(':')[0], sunset.split(':')[1])
      return (dtDate > sunsetDate || dtDate < sunriseDate)
    }

    return {
      weatherData,
      weatherConditionIcons,
      isNight,
    }

  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="item in weatherData" :class="{'weather-card--night':isNight(item.current.dt, item.current.sunrise, item.current.sunset)}" class="weather-card">
          <div v-if="item.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{item.alert.sender_name}}: {{item.alert.description}}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{item.geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{item.current.dt}}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="item.current.weather.description">{{weatherConditionIcons[item.current.weather.id]}}</div>
            <div class="weather-conditions__temp">{{(item.current.temp - 273.15).toFixed(1) + ' °C'}}</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ (item.current.pressure * 0.75).toFixed(0) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ item.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ item.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ item.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
