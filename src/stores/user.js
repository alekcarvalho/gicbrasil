import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => {
    return { user: null }
  },
  getters: {
    get(state) {
      return state.user
    },
  },
  actions: {
    add(payload) {
      this.user = payload
    },
    delete() {
      this.user = null
    },
  },
  persist: true,
})
