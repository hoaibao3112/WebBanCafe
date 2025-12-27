import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch {
        return [];
    }
};

// Save cart to localStorage
const saveCartToStorage = (items) => {
    try {
        localStorage.setItem('cart', JSON.stringify(items));
    } catch {
        // Ignore storage errors
    }
};

const initialState = {
    items: loadCartFromStorage(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingIndex = state.items.findIndex(
                item => item.id === newItem.id && 
                JSON.stringify(item.options) === JSON.stringify(newItem.options)
            );

            if (existingIndex >= 0) {
                state.items[existingIndex].quantity += newItem.quantity;
            } else {
                state.items.push(newItem);
            }
            saveCartToStorage(state.items);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            saveCartToStorage(state.items);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    item.quantity = quantity;
                }
            }
            saveCartToStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            saveCartToStorage(state.items);
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
