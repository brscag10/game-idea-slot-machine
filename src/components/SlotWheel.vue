<template>
  <section class="SlotWheel">
    <div class="SlotWheel__value">{{ displayValue }}</div>
    <h2 class="SlotWheel__name">{{ name }}</h2>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import randomIntFactory from "../lib/random-int-factory";
import { setTimeout } from "timers";

export default Vue.extend({
  data: function() {
    const randomOptionIndex = randomIntFactory(this.$props.options.length - 1);

    return {
      displayValue: this.$props.options[randomOptionIndex()]
    };
  },
  methods: {
    roll() {
      // TODO: make these parameters configurable
      const randomOptionIndex = randomIntFactory(this.$props.options.length - 1);
      const startingVelocity = randomIntFactory(100)();
      const maximumTimeout = 1000 + randomIntFactory(100)();
      const coeffOfFriction = 1.25;

      let nextTimeout = startingVelocity;

      return new Promise(resolve => {
        const tick = () => {
          this.$set(this, "displayValue", this.$props.options[randomOptionIndex()]);

          nextTimeout *= coeffOfFriction;

          if (nextTimeout > maximumTimeout) {
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
