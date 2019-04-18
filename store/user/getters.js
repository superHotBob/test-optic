export default {
    getEndpointLogin: (state) => {
      return state.endpoint.login;
    },
    getEndpointLogout: (state) => {
      return state.endpoint.logout;
    },
    getEndpointUser: (state) => {
      return state.endpoint.user;
    },
    isLogged: (state) => {
      return state.logged;
    },
}