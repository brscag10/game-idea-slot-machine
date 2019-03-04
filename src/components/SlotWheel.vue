<template>
  <section class="SlotWheel">
    <div class="SlotWheel__value">{{ isSpinning ? displayValue : currentValue }}</div>
    <h2 class="SlotWheel__name">{{ name }}</h2>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    props: ["name", "options", "displayValue", "currentValue", "isSpinning"]
  })
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
