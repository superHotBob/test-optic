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
    },
    isCoupon: (state) => (coupon) => {
      
      var couponsList;

      if (state.basket.COUPON_LIST) {
          couponsList = state.basket.COUPON_LIST;
          for (let key in couponsList) {
            if (couponsList[key].COUPON == coupon)
              return true;
          }
      }
      return false;
    }
}