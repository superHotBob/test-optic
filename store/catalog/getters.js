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
      return state.sections.SECTIONS;
  },
  getSectionsIndex: (state) => (index) => {
    return state.sections.SECTIONS[index];
  },
  getCountFavorites: (state) => {
    return state.favorites.count;
  },
  getCountCompare: (state) => {
    return state.compare.count;
  },
  getEndpointBestsellers: (state) => {
    return state.endpoint.bestsellers;
  },
  getEndpointElements: (state) => {
    return state.endpoint.elements;
  },
  isFavorites: (state) => (id) => {
    if (state.favorites.items.hasOwnProperty(id))
      return true;
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