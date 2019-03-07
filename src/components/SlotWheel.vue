<template>
  <section class="SlotWheel">
    <div class="SlotWheel__value">{{ displayValue }}</div>
    <h2 class="SlotWheel__name">{{ name }}</h2>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { setTimeout } from "timers";

import ShuffleQueue from "../lib/shuffle-queue";
import randomIntFactory from "../lib/random-int-factory";

interface Range<T> {
  max: T;
  min: T;
}

interface SlotPhysicsConfig {
  startingSlotVelocityMS: Range<number>;
  finalTickInterval: Range<number>;
  frictionCoeffecient: number;
}

const config = require("../app.config.yml") as SlotPhysicsConfig;

export default Vue.extend({
  data: function() {
    const { startingSlotVelocityMS, finalTickInterval } = config;

    return {
      displayValue: "---",
      queue: new ShuffleQueue<string>(this.$props.options),

      randomStartingVelocity: randomIntFactory(startingSlotVelocityMS.max, startingSlotVelocityMS.min),
      randomFinalTickInterval: randomIntFactory(finalTickInterval.max, finalTickInterval.min)
    };
  },
  methods: {
    roll() {
      const startingVelocity = this.$data.randomStartingVelocity();
      const finalTickInterval = this.$data.randomFinalTickInterval();

      let nextTimeout = startingVelocity;

      return new Promise(resolve => {
        const tick = () => {
          this.$set(this, "displayValue", this.$data.queue.pick());

          nextTimeout *= config.frictionCoeffecient;

          if (nextTimeout > finalTickInterval) {
            resolve();
          } else {
            setTimeout(tick, nextTimeout);
          }
        };

        tick();
      });
    }
  },
  props: {
    name: String,
    options: Array
  }
});
</script>

<style scoped>
.SlotWheel {
  height: 10em;
  border: 1px solid black;
  padding: var(--vert-padding) var(--horiz-padding);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.SlotWheel__value {
  font-size: var(--title-size);
}

.SlotWheel__name {
  font-size: var(--footnote-size);
  text-transform: uppercase;

  color: red;
}
</style>
