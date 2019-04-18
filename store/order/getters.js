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
  getComment: (state) => {
    var description = state.order.ORDER_DESCRIPTION,
      comment;
    
    if (description)
      comment = description;
    else 
      comment = ''

    return comment;
  },
  getProperties: (state) => {
    return state.order.ORDER_PROP.properties;
  },
}