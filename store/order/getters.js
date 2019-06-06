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
    if (state.order.hasOwnProperty('ORDER_PROP')) {
      return state.order.ORDER_PROP.properties;
    }
  },
  getLocationName: (state) => (payload) => {
    if (!state.locations)
      return false;
    var locations = state.locations[payload.id].output;

    for (let key in locations) {
      // if (locations[key].VALUE == payload.code)
        if (locations[key].LOCATION.NAME)
          return locations[key].LOCATION.NAME;
        return false;
    }
  },
  getLocationList: (state) => {
    return state.locationList;
  },
  getLocationShow: (state) => {
    return state.locationShow;
  },
  getErrorProperty: (state) => (id) => {
    var error = state.order.ERROR;
    if (!error)
      return false;

    if (error.hasOwnProperty('PROPERTY')) {
      for (let key in error.PROPERTY) {
        if (error.PROPERTY[key].code === 'PROPERTIES[' + id + ']') {
          return error.PROPERTY[key].message;
        }
      }
    }
  },
  groupHasErrors: (state) => (groupId) => {
    if (!state.order.ORDER_PROP)
      return false;

    var properties = state.order.ORDER_PROP.properties
    var groupProps = [];
    for (let el in properties) {
      if (properties[el].PROPS_GROUP_ID == groupId) {
        groupProps.push(properties[el].ID);
      }
    }

    var error = state.order.ERROR;
    if (!error)
      return false;
    
    if (error.hasOwnProperty('PROPERTY')) {
      for (let el in groupProps) {
        for (let key in error.PROPERTY) {
          if (error.PROPERTY[key].code === 'PROPERTIES[' + groupProps[el] + ']') {
            return true;
          }
        }        
      }
    }
  },
  getTotalPrice: (state) => {
    if (state.order.hasOwnProperty('ORDER_PROP')) {
      return state.order.TOTAL.ORDER_TOTAL_PRICE_FORMATED;
    }
  },
  isEmptyBasket: (state) => {
    return state.order.SHOW_EMPTY_BASKET;
  }
}