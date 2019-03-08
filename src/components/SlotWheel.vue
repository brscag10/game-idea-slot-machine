<template>
  <section
    class="SlotWheel"
    v-bind:class="{ 'SlotWheel--set': isSpinning === false, 'SlotWheel--tick': hasTicked === true }"
    v-bind:style="{ 'animation-duration': tickDuration + 'ms' }"

    @animationend="clearTick"
  >
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
      displayValue: "--",
      queue: new ShuffleQueue<string>(this.$props.options),
      isSpinning: null,
      hasTicked: null,
      tickDuration: null,

      randomStartingVelocity: randomIntFactory(startingSlotVelocityMS.max, startingSlotVelocityMS.min),
      randomFinalTickInterval: randomIntFactory(finalTickInterval.max, finalTickInterval.min)
    };
  },
  methods: {
    roll() {
      this.$set(this, "isSpinning", true);

      const startingVelocity = this.$data.randomStartingVelocity();
      const finalTickInterval = this.$data.randomFinalTickInterval();

      let nextTimeout = startingVelocity;

      return new Promise(resolve => {
        const tick = () => {
          this.$set(this, "displayValue", this.$data.queue.pick());

          nextTimeout *= config.frictionCoeffecient;

          if (nextTimeout > finalTickInterval) {
            this.$set(this, "isSpinning", false);
            resolve();
          } else {
            this.$set(this, "tickDuration", nextTimeout / 2);
            this.$set(this, "hasTicked", true);

            setTimeout(tick, nextTimeout);
          }
        };

        tick();
      });
    },
    clearTick() {
      this.$set(this, "hasTicked", false);
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

  transition: background-color 350ms ease-out;

  will-change: background-color;
}

.SlotWheel--tick {
  animation-name: tick;
}

@keyframes tick {
  from {
    background-color: pink;
  }
  to {
    background-color: transparent;
  }
}

.SlotWheel--tick > .SlotWheel__value {
  will-change: color;
}

.SlotWheel--set {
  background: lightgreen;
}

.SlotWheel--set > .SlotWheel__value {
  color: green;
}

.SlotWheel__value {
  font-size: var(--title-size);

  transition: color 350ms ease-out;
}

.SlotWheel__name {
  font-size: var(--footnote-size);
  text-transform: uppercase;

  color: red;
}
</style>
