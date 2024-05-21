import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  id: 'loading',
  state: () => ({
    isLoading: false
  }),
  getters: {
    getLoading: (state) => state.isLoading
  },
  actions: {
    setLoading(val) {
      this.isLoading = val
    }
  }
})
