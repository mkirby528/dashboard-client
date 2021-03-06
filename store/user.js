export const state = () => ({
  isLoggedIn: false,
  user: {

  }
})

export const mutations = {
  login(state, user) {
    state.user = user;
    state.isLoggedIn = true;
  },
  logout(state) {
    state.user = {}
    state.isLoggedIn = false;
  },
  logoutSpotify(state) {
    state.user.spotifyTokenData = undefined
    state.user.spotifyState = undefined
  }
}