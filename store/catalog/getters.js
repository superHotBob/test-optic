export default {
  getView: (state) => {   
    return state.view;
  },
  getEndpointSections: (state) => {
    return state.endpoint.sections;
  },
  getEndpointFavorites: (state) => {
    return state.endpoint.favorites;
  },
  getEndpointCompare: (state) => {
    return state.endpoint.compare;
  },
  getSections: (state) => {
      console.log(state.sections.SECTIONS);
      return state.sections.SECTIONS;
  },
  getSectionsIndex: (state) => (index) => {
    return state.sections.SECTIONS[index];
  },
  getCountFavorites: (state) => {
    //console.log('favorite', state.favorites.count);
    return state.favorites.count;
  },
  getCountCompare: (state) => {
    //console.log('compare', parseInt(state.compare.count));
    return parseInt(state.compare.count);
  },
  getEndpointBestsellers: (state) => {
    return state.endpoint.bestsellers;
  },
  getEndpointElements: (state) => {
    return state.endpoint.elements;
  },
  isFavorites: (state) => (id) => {
    for(let i in state.favorites.items) {
      if(state.favorites.items[i].ID == id) return true;
    }   
    return false;
  },
  isCompare: (state) => (id) => {

    if (!state.compare.items)
      return false

    if (state.compare.items.hasOwnProperty(id))
      return true;
    return false;
  }
}