export default {
    getEndpointSections: (state) => {
      return state.endpoint.sections;
    },
    getSections: (state) => {
        return state.sections.SECTIONS;
    },
    getSectionsIndex: (state) => (index) => {
      return state.sections.SECTIONS[index];
  }
}