<template>
  <v-app-bar
    color="#00000000"
    app
    dark
    flat>
    <div class="d-flex align-center">
      <span :class="$style.title">
        Blue
      </span>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppBar',
});
</script>

<style lang="scss" module>
.title {
  font-size: 1.5rem;
  color: #1F416C;
  font-weight: 400;
}
</style>
