import { createSlice,type PayloadAction } from '@reduxjs/toolkit';
import type { ProductItem } from '../../types/product';


interface ProductState {
    products: ProductItem[];
    selectedProduct: ProductItem | null;
}

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<ProductItem[]>) {
            state.products = action.payload;
        },
        addProduct(state, action: PayloadAction<ProductItem>) {
            state.products.push(action.payload);
        },
        updateProduct(state, action: PayloadAction<ProductItem>) {
            const index = state.products.findIndex(p => p._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        removeProduct(state, action: PayloadAction<number | string>) {
            state.products = state.products.filter(p => p._id !== action.payload);
        },
        selectProduct(state, action: PayloadAction<ProductItem>) {
            state.selectedProduct = action.payload;
        },
        toggleFavorite(state, action: PayloadAction<number | string>) {
            const product = state.products.find(p => p._id === action.payload);
            if (product) {
                product.isFavorite = !product.isFavorite;
            }
        },
    },
});

export const {
    setProducts,
    addProduct,
    updateProduct,
    removeProduct,
    selectProduct,
    toggleFavorite,
} = productSlice.actions;

export default productSlice;