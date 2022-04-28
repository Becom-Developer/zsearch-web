export const state = () => ({
  zipcodeDetail: {},
  perPage: 10,
  currentPage: 1,
  items: [],
  isDetail: false,
  town: '',
})

export const mutations = {
  addState(state, { stateKey, data }) {
    state[stateKey] = data
  },
}
