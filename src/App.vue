<template>
  <div class="SlotApp">
    <article class="SlotMachine">
      <slot-wheel
        v-for="wheel in slots"
        v-bind:key="wheel.name"
        v-bind.sync="wheel"

        ref="slotWheels"
      />
    </article>

    <button class="SlotLever" @click="spin" :disabled="isSpinning">
      {{ isSpinning ? "Spinning..." : "Spin!" }}
    </button>
  </div>
</template>


<script lang="ts">
import Vue from "vue";

import randomIntFactory from "./lib/random-int-factory";
import SlotWheel from "./components/SlotWheel.vue";

interface SlotConfig {
  slots: {
    name: string;
    options: string[];
  }[]
}

const slotConfig = require("./app.config.yml") as SlotConfig;

export default Vue.extend({
  data: function() {
    return {
      isSpinning: false,
      slots: slotConfig.slots
    }
  },
  methods: {
    async spin() {
      this.isSpinning = true;

      await Promise.all(
        this.$refs.slotWheels.map(wheel => wheel.roll())
      );
        
      this.isSpinning = false;
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

.SlotLever[disabled] {
  background: gray;

  cursor: not-allowed;
}
</style>
