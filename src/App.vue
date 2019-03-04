<template>
  <div class="SlotApp">
    <article class="SlotMachine">
      <slot-wheel
        v-for="slot in slots"
        v-bind:key="slot.name"
        v-bind.sync="slot"
        :isSpinning="isSpinning"
      />
    </article>

    <button class="SlotLever" @click="spin">Spin!</button>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import flow from "lodash.flow";

import SlotWheel from "./components/SlotWheel.vue";
import config from "./app.config.yml";

interface SlotConfig {
  slots: {
    name: string;
    options: string[];
  }[]
}

const slotConfig = config as SlotConfig;

const randomIntFactory: (int: number) => () => number = (int: number) => () =>
  Math.round(Math.random() * int);

export default Vue.extend({
  data: function() {
    return {
      isSpinning: true,
      slots: slotConfig.slots.map(slot => {
        const randomOption = flow([randomIntFactory(slot.options.length - 1), int => slot.options[int]])

        return {
          ...slot,
          displayValue: randomOption(),
          currentValue: randomOption()
        };
      })
    }
  },
  methods: {
    spin() {
      this.isSpinning = true;

      console.log(this.isSpinning);

      // let nextInterval = 60;

      // setInterval(() => {}, nextInterval);
    }
  },
  components: {
    SlotWheel
  }
});
</script>


<style scoped>
.SlotApp {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
}

.SlotMachine {
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: var(--max-supported-width);
  min-width: var(--min-supported-width);

  padding: var(--vert-padding) var(--horiz-padding);
}

.SlotLever {
  font-size: var(--paragraph-size);
  padding: var(--vert-padding) var(--horiz-padding);

  color: white;
  background: black;

  cursor: pointer;
}
</style>
