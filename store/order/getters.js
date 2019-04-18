export default {
  getOrder: (state) => {
    return state.order;
  },  
  getEndpointOrder: (state) => {
    return state.endpoint.order;
  },
  getEndpointLocation: (state) => {
    return state.endpoint.location;
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
  getLocationName: (state) => (payload) => {
    
    var locations = state.locations[payload.id].output;

    for (let key in locations) {
      if (locations[key].VALUE == payload.code)
        return locations[key].LOCATION.NAME;
    }
  }
}