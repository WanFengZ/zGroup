export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    if (req.ctx.isAuthenticated()) {
      const user = {}
      user.username = req.ctx.session.passport.user.username
      user.email = req.ctx.session.passport.user.email
      commit('user/setUser', user)
    }

    const { status, data: position } = await app.$axios.get('/geo/getPosition')
    commit('geo/setPosition', status === 200 ? position : null)

    const { status: status2, data: { menu } } = await app.$axios.get('/geo/menu')
    commit('home/setMenu', status2 === 200 ? menu : [])

    const { status: status3, data: { place } } = await app.$axios.get('/search/hotPlace', {
      params: {
        city: app.store.state.geo.position.city.replace('市', '')
      }
    })
    commit('home/setHotPlace', status3 === 200 ? place : [])

    const { status: status4, data: { hots } } = await app.$axios.get('/geo/hotCity')
    commit('geo/setHotCity', status4 === 200 ? hots : [])
  }
}
