<template>
  <div @click="domInteracted">
    <app-bar />

    <v-app>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

import AppBar from './components/ui/app/app-bar.vue';

export default Vue.extend({
  name: 'App',

  components: {
    AppBar,
  },

  methods: {
    ...mapActions('audio', [
      'domInteracted',
    ]),
  },
});
</script>
