export default {
  getEndpointSections: (state) => {
    return state.endpoint.sections;
  },
  getEndpointFavorites: (state) => {
    return state.endpoint.favorites;
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
  isFavorites: (state) => (id) => {
    if (state.favorites.items.hasOwnProperty(id))
      return true;
    return false;
  }
}