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
    getEndpointRegister: (state) => {
      return state.endpoint.register;
    },
    getEndpointUpdate: (state) => {
      return state.endpoint.update;
    },
    isLogged: (state) => {
      return state.logged;
    },
    getName: (state) => {
      return state.user.name;
    },
    getLastName: (state) => {
      return state.user.last_name;
    },
    getSecondName: (state) => {
      return state.user.second_name;
    },
    getEmail: (state) => {
      return state.user.email;
    },
    getPhone: (state) => {
      return state.user.phone;
    },
    getUpdateDate: (state) => {
      return state.user.update;
    },
    getLoginDate: (state) => {
      return state.user.active;
    },
}