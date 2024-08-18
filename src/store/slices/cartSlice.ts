import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "@/types";

interface CartItemType extends ProductType {
  quantity: number;
}

interface CartState {
  items: CartItemType[];
  productNumber: number;
}

const getInitialCartItems = (): CartItemType[] => {
  if (typeof window !== "undefined") {
    const cartItems = localStorage.getItem("cart");
    return cartItems ? JSON.parse(cartItems) : [];
  }
  return [];
};

const getInitialProductNumber = (items: CartItemType[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

const initialItems = getInitialCartItems();
const initialState: CartState = {
  items: initialItems,
  productNumber: getInitialProductNumber(initialItems),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemType>) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.productId === item.productId
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      state.productNumber = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );
      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      } else if (existingItem && quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.productId !== productId
        );
      }
      state.productNumber = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      state.productNumber = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.productNumber = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
