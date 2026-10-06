import { create } from "zustand";

export type OrderItemState = {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
};

type OrderState = {
  customerId: number | null;
  status: string;
  items: OrderItemState[];

  setCustomerId: (customerId: number) => void;
  setStatus: (status: string) => void;

  addItem: (item: OrderItemState) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;

  clearOrder: () => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  customerId: null,

  status: "Pending",

  items: [],

  setCustomerId: (customerId) =>
    set({
      customerId,
    }),

  setStatus: (status) =>
    set({
      status,
    }),

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (x) => x.productId === item.productId,
      );

      if (existingItem) {
        return {
          items: state.items.map((x) =>
            x.productId === item.productId
              ? {
                  ...x,
                  quantity: x.quantity + item.quantity,
                }
              : x,
          ),
        };
      }

      return {
        items: [...state.items, item],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter(
        (x) => x.productId !== productId,
      ),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((x) =>
        x.productId === productId
          ? {
              ...x,
              quantity,
            }
          : x,
      ),
    })),

  clearOrder: () =>
    set({
      customerId: null,
      status: "Pending",
      items: [],
    }),
}));