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
      if (!state.user)
        return;

      return state.user.name;
    },
    getLastName: (state) => {
      if (!state.user)
        return;

      return state.user.last_name;
    },
    getSecondName: (state) => {
      if (!state.user)
        return;

      return state.user.second_name;
    },
    getEmail: (state) => {
      if (!state.user)
        return;

      return state.user.email;
    },
    getPhone: (state) => {
      if (!state.user)
        return;

      return state.user.phone;
    },
    getUpdateDate: (state) => {
      if (!state.user)
        return;

      return state.user.update;
    },
    getLoginDate: (state) => {
      if (!state.user)
        return;

      return state.user.active;
    },
    getSessid: (state) => {
      return state.sessid;
    },
}