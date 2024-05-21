<script>
import LoadingOverlay from './components/LoadingOverlay.vue'
import { useLoadingStore } from '@/stores/loading'
export default {
  name: 'App',
  components: {
    LoadingOverlay
  },
  data() {
    return {
      store: useLoadingStore()
    }
  },
  computed: {
    isLoading() {
      return this.store.getLoading
    }
  }
}
</script>

<template>
  <LoadingOverlay v-if="isLoading" />
  <RouterView />
</template>

<style scoped></style>
