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
// Создаём Vue приложение - абстракцию для конфигурации
const app = createApp(App)
// Через приложение можно устанавливать плагины, глобальную конфигурацию и др.
// app.use(plugin)

// После монтирования приложения на страницу, Vue отвечает за рендеринг этой части страницы.
// Метод возвращает экземпляр корневого компонента
const vm = app.mount('#app')

// Для отладки - добавим в глобальную переменную
// Позже научимся делать это через vue-devtools
window.vm = vm
