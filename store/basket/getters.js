export default {
    getBasket: (state) => {
      return state.basket;
    },
    getEndpoint: (state) => {
      return state.endpoint;
    },
    getRecalculate: (state) => {
      return state.recalculate;
    },
    getItem: (state) => (id) => {
      return state.basket.GRID.ROWS[id]
    }
}