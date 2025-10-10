import { defineComponent, createApp } from 'vue'
const App = defineComponent({
  name: 'App',
  setup() {
    const dateFormatted = new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' });
    return {
      dateFormatted
    };
  },

  template: `
  <div>{{'Сегодня ' + dateFormatted}}</div>
  `
});
const app = createApp(App)
const vm = app.mount('#app')
window.vm = vm
