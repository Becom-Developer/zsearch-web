export const state = () => ({
  zipcodeDetail: {},
  perPage: 10,
  currentPage: 1,
  items: [],
  isDetail: false,
  zipInput: {
    code: '',
    pref: '',
    town: '',
    city: '',
  },
})

export const mutations = {
  addState(state, { stateKey, data }) {
    state[stateKey] = data
  },
  buildInput(state, { inputKey, row }) {
    for (const key in state[inputKey]) {
      if (key in row) {
        state[inputKey][key] = row[key]
      }
    }
  },
}
