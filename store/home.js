export const state = () => ({
  menus: [],
  hotPlace: []
})

export const mutations = {
  setMenu(state, menu) {
    state.menus = menu
  },
  setHotPlace(state, place) {
    state.hotPlace = place
  }
}
