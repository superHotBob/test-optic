export default {
  getOrder: (state) => {
    return state.order;
  },  
  getEndpoint: (state) => {
    return state.endpoint;
  },
  getSessid: (state) => {
    return state.sessid;
  },
  getDescription: (state) => {
    return state.order.ORDER_DESCRIPTION;
  },
  getCurrentPaySystem: (state) => {
    var paysystem = state.order.PAY_SYSTEM;

    for (let i = 0; i < paysystem.length; i++ ) {
      if(paysystem[i].CHECKED) {
        return paysystem[i].ID;
      }
    }
  },
  getCurrentDelivery: (state) => {
    var delivery = state.order.DELIVERY;

    for (let key in delivery) {
      if(delivery[key].CHECKED) {
        return delivery[key].ID;
      }
    }
  },
  getCurrentPerson: (state) => {
    var personal = state.order.PERSON_TYPE;

    for (let key in personal) {
      if(personal[key].CHECKED) {
        return personal[key].ID;
      }
    }
  },
}