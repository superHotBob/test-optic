export default {
  getOrder: (state) => {
    return state.order;
  },  
  getEndpoint: (state) => {
    return state.endpoint;
  },
  getCurrentPaySystem: (state) => {
    var paysystem = state.order.PAY_SYSTEM;

    for (let i = 0; i < paysystem.length; i++ ) {
      if(paysystem[i].CHECKED) {
        return paysystem[i].ID;
      }
    }
  }
}