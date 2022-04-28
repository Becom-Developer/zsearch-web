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
  zip: {
    code1: { val: 10, isRead: true },
    code2: { val: 10, isRead: true },
    code3: { val: 10, isRead: true },
    code4: { val: 10, isRead: true },
    code5: { val: 10, isRead: true },
    code6: { val: 10, isRead: true },
    code7: { val: 10, isRead: true },
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
