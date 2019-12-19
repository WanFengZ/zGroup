export const state = () => ({
  position: null,
  hotCity: []
})

export const mutations = {
  setPosition(state, position) {
    state.position = position
  },
  setHotCity(state, city) {
    state.hotCity = city
  }
}
