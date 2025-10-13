import { defineComponent, ref, computed} from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    let operator = ref(null)
    let firstOperand = ref(null)
    let secondOperand = ref(null)

    let result = computed(() => {
      switch (operator.value) {
        case 'sum':
          return (firstOperand.value + secondOperand.value);
        case 'subtract':
          return (firstOperand.value - secondOperand.value);
        case 'multiply':
          return (firstOperand.value * secondOperand.value);
        case 'divide':
          return (firstOperand.value / secondOperand.value);
      }
    })

    return {
      operator,
      firstOperand,
      secondOperand,
      result
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstOperand"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="operator" />➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="operator" />➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="operator" />✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="operator"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondOperand"/>

      <div>=</div>

      <output>{{result}}</output>
    </div>
  `,
})
