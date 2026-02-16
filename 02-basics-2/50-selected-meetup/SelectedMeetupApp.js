import { defineComponent, ref, onMounted, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const currentMeetupId = ref(1);
    const meetup = ref(null);
    onMounted(async () => {
      try {
        meetup.value = await getMeetup(currentMeetupId.value)
      } catch (error) {
        console.error(error)
      }
    })
    watch(currentMeetupId, async () => {meetup.value = await getMeetup(currentMeetupId.value)})

    return {
      currentMeetupId,
      meetup
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="(currentMeetupId === 1)" @click="currentMeetupId--">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <template v-for="i in 5">
          <div class="radio-group__button">
            <input
              :id="'meetup-id-' + i"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="i"
              v-model="currentMeetupId"
            />
            <label :for="'meetup-id-' + i" class="radio-group__label">{{i}}</label>
          </div>
          </template>
        </div>

        <button class="button button--secondary" type="button" :disabled="(currentMeetupId === 5)" @click="currentMeetupId++">Следующий</button>
      </div>

      <div v-if="(meetup !== null)" class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{meetup.title}}</h1>
        </div>
      </div>

    </div>
  `,
})
