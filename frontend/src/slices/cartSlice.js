import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducer: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItem.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItem = state.cartItem.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItem = [...state.cartItem, item];
      }
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      state.shippingPrice = addDecimals(Number(state.itemsPrice === 10));
      state.TaxPrice = addDecimals(Number((0.1 * state.itemsPrice).toFixed(2)));
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.TaxPrice)
      ).toFixed(2);
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
