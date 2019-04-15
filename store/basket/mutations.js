export default {
    setBasket(state, basket) {
        state.basket = basket;
    },
    setQuantity(state, payload) {
        state.basket.GRID.ROWS[payload.id].QUANTITY = payload.quantity;
    }
}
  