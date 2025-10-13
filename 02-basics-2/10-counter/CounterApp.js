import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    let i = ref(0);
    return {
      i
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="i === 0"
        v-on:click="i--"
      >➖</button>
      <span class="count" data-testid="count" >{{i}}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="i === 5"
        v-on:click="i++"
      >➕</button>
    </div>
  `,
})
