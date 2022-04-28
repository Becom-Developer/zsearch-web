export const state = () => ({
  zipcodeDetail: {},
})

export const mutations = {
  addState(state, { stateKey, data }) {
    state[stateKey] = data
  },
}
