import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseApi } from '../app';

interface ProductData {
    name: string;
    price: string;
    description: string;
    category_id: number;
    quantity: number;
    free_delivery: string;
    shipping_fee: number;
    discount_available: string;
    discount_percentage: number;
    brand: string;
    product_warranty: string;
    weight: number;
    productID: number;
}

export const getMyProducts = createAsyncThunk(
    'product/getMyProducts',
    async (token: any, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/merchant/product/products-by-logged-merchant`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (data: ProductData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/product/create-product`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (data: ProductData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/product/update-product/${data.productID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const addProductImages = createAsyncThunk(
    'product/addProductImages',
    async (data: any, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/product/add-product-images/${data.productID}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const deactivateProduct = createAsyncThunk(
    'product/deactiveProduct',
    async (productID: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseApi}flip/merchant/product/deactivate-product/${productID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const activateProduct = createAsyncThunk(
    'product/activeProduct',
    async (productID: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseApi}flip/merchant/product/activate-product/${productID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const addProductFeatures = createAsyncThunk(
    'product/addProductFeatures',
    async (data: any, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/product/add-product-feature/${data.productID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const addProductSpecifications = createAsyncThunk(
    'product/addProductSpecifications',
    async (data: any, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/product/add-product-specs/${data.productID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const removeProductSpecification = createAsyncThunk(
    'product/removeProductSpecification',
    async (data: any, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseApi}flip/merchant/product/remove-product-spec/${data.productID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const removeProductImage = createAsyncThunk(
    'product/removeProductImage',
    async (id: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseApi}flip/merchant/product/remove-product-image/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getAllProducts = createAsyncThunk(
    'product/getAllProducts',
    async (data: any, thunkAPI: any) => {
        const { search, priceRange, discountPercentage, freeDelivery, byMerchant, category } = data;
        try {
            const response = await axios.get(`
             ${baseApi}flip/product/all-products?search=${search}&category=${category}&priceRange=${priceRange}&discountPercentage=${discountPercentage}&freeDelivery=${freeDelivery}&byMerchant=${byMerchant}
            `);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getProductsByCategory = createAsyncThunk(
    'product/getProductsByCategory',
    async (categoryID: number, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/product/products-by-category/${categoryID}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getProductsCategory = createAsyncThunk(
    'product/getProductsCategory',
    async (thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/product/categories`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getSingleProduct = createAsyncThunk(
    'product/getSingleProduct',
    async (productID: number, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/product/single-product/${productID}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getProductReviews = createAsyncThunk(
    'product/getProductReviews',
    async (productID: number, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/product/get-product-reviews/${productID}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getMerchantDetails = createAsyncThunk(
    'product/getMerchantDetails',
    async (merchantID: number, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/merchant/single-merchant/${merchantID}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getMerchantProducts = createAsyncThunk(
    'product/getMerchantProducts',
    async (merchantID: number, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/product/product-by-merchant/${merchantID}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getSingleProductStat = createAsyncThunk(
    'product/getSingleProductStat',
    async (productID: number, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/product/get-product-reviews-stats/${productID}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getFilterdProducts = createAsyncThunk(
    'product/getSearchedProducts',
    async (query: any, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/product/all-products`);

            const filteredProducts = response.data.data.products.filter((product: any) => {
                return product.product.name.toLowerCase().includes(query.search.toLowerCase()) ||
                    product.category.name.toLowerCase().includes(query.search.toLowerCase()) ||
                    product.product.brand.toLowerCase().includes(query.search.toLowerCase());
            })
            return filteredProducts;

        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

interface ProductState {
    products: any;
    product: any;
    reviews: any;
    merchant: any;
    productsCategory: any;
    success: boolean;
    loading: boolean;
    error: string;
    message: string;
    errorFetchProducts: string;
    successFetchProducts: boolean;
    loadingFetchProducts: boolean;
    errorActivateProductDeactivateProduct: string;
    successActivateProductDeactivateProduct: boolean;
    loadingActivateProductDeactivateProduct: boolean;
    searchedProducts: any;
    productStat: any;
    loadingProductStat: boolean;
    errorProductStat: string;
    successProductStat: boolean;
}

const initialState: ProductState = {
    products: [],
    product: {},
    reviews: [],
    merchant: {},
    productsCategory: [],
    success: false,
    loading: false,
    error: '',
    message: '',
    errorFetchProducts: '',
    successFetchProducts: false,
    loadingFetchProducts: false,
    errorActivateProductDeactivateProduct: '',
    successActivateProductDeactivateProduct: false,
    loadingActivateProductDeactivateProduct: false,
    searchedProducts: [],
    productStat: {},
    loadingProductStat: false,
    errorProductStat: '',
    successProductStat: false,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = '';
            state.success = false;
            state.successFetchProducts = false;
            state.successActivateProductDeactivateProduct = false;
        },
        clearError: (state) => {
            state.error = '';
            state.success = false;
            state.errorFetchProducts = '';
            state.successFetchProducts = false;
            state.errorActivateProductDeactivateProduct = '';
            state.successActivateProductDeactivateProduct = false;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        })
        builder.addCase(createProduct.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        })
        builder.addCase(getMyProducts.pending, (state) => {
            state.loadingFetchProducts = true;
        })
        builder.addCase(getMyProducts.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.successFetchProducts = true;
            state.products = action.payload.data;
        })
        builder.addCase(getMyProducts.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.errorFetchProducts = action.payload?.message;
        })
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateProduct.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        })
        builder.addCase(updateProduct.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        })
        builder.addCase(deactivateProduct.pending, (state) => {
            state.loadingActivateProductDeactivateProduct = true;
        })
        builder.addCase(deactivateProduct.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingActivateProductDeactivateProduct = false;
            state.successActivateProductDeactivateProduct = true;
            state.message = action.payload?.message;
        })
        builder.addCase(deactivateProduct.rejected, (state, action: PayloadAction<any>) => {
            state.loadingActivateProductDeactivateProduct = false;
            state.errorActivateProductDeactivateProduct = action.payload?.message;
        })
        builder.addCase(activateProduct.pending, (state) => {
            state.loadingActivateProductDeactivateProduct = true;
        })
        builder.addCase(activateProduct.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingActivateProductDeactivateProduct = false;
            state.successActivateProductDeactivateProduct = true;
            state.message = action.payload?.message;
        })
        builder.addCase(activateProduct.rejected, (state, action: PayloadAction<any>) => {
            state.loadingActivateProductDeactivateProduct = false;
            state.errorActivateProductDeactivateProduct = action.payload?.message;
        })
        builder.addCase(addProductImages.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addProductImages.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        })
        builder.addCase(addProductImages.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        })
        builder.addCase(addProductSpecifications.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addProductSpecifications.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        })
        builder.addCase(addProductSpecifications.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        })
        builder.addCase(addProductFeatures.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addProductFeatures.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        })
        builder.addCase(addProductFeatures.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        })
        builder.addCase(removeProductSpecification.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(removeProductSpecification.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        })
        builder.addCase(removeProductSpecification.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        })
        builder.addCase(removeProductImage.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(removeProductImage.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        })
        builder.addCase(removeProductImage.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        })
        builder.addCase(getAllProducts.pending, (state) => {
            state.loadingFetchProducts = true;
        })
        builder.addCase(getAllProducts.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.successFetchProducts = true;
            state.products = action.payload.data;
        })
        builder.addCase(getAllProducts.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.errorFetchProducts = action.payload?.message;
        })
        builder.addCase(getFilterdProducts.pending, (state) => {
            state.loadingFetchProducts = true;
        })
        builder.addCase(getFilterdProducts.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.successFetchProducts = true;
            state.searchedProducts = action.payload.data;
        })
        builder.addCase(getFilterdProducts.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.errorFetchProducts = action.payload?.message;
        })
        builder.addCase(getProductsByCategory.pending, (state) => {
            state.loadingFetchProducts = true;
        })
        builder.addCase(getProductsByCategory.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.successFetchProducts = true;
            state.products = action.payload.data;
        })
        builder.addCase(getProductsByCategory.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.errorFetchProducts = action.payload?.message;
        })
        builder.addCase(getProductsCategory.pending, (state) => {
            state.loadingFetchProducts = true;
        })
        builder.addCase(getProductsCategory.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.successFetchProducts = true;
            state.productsCategory = action.payload.data;
        })
        builder.addCase(getProductsCategory.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.errorFetchProducts = action.payload?.message;
        })
        builder.addCase(getSingleProduct.pending, (state) => {
            state.loadingFetchProducts = true;
        })
        builder.addCase(getSingleProduct.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.successFetchProducts = true;
            state.product = action.payload.data;
        })
        builder.addCase(getSingleProduct.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.errorFetchProducts = action.payload?.message;
        })
        builder.addCase(getProductReviews.pending, (state) => {
            state.loadingFetchProducts = true;
        })
        builder.addCase(getProductReviews.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.successFetchProducts = true;
            state.reviews = action.payload.data;
        })
        builder.addCase(getProductReviews.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.errorFetchProducts = action.payload?.message;
        })
        builder.addCase(getMerchantDetails.pending, (state) => {
            state.loadingFetchProducts = true;
        })
        builder.addCase(getMerchantDetails.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.successFetchProducts = true;
            state.merchant = action.payload.data;
        })
        builder.addCase(getMerchantDetails.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.errorFetchProducts = action.payload?.message;
        })
        builder.addCase(getMerchantProducts.pending, (state) => {
            state.loadingFetchProducts = true;
        })
        builder.addCase(getMerchantProducts.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.successFetchProducts = true;
            state.products = action.payload.data;
        })
        builder.addCase(getMerchantProducts.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchProducts = false;
            state.errorFetchProducts = action.payload?.message;
        })
        builder.addCase(getSingleProductStat.pending, (state) => {
            state.loadingProductStat = true;
        })
        builder.addCase(getSingleProductStat.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingProductStat = false;
            state.successProductStat = true;
            state.productStat = action.payload.metadata;
        })
        builder.addCase(getSingleProductStat.rejected, (state, action: PayloadAction<any>) => {
            state.loadingProductStat = false;
            state.errorProductStat = action.payload?.message;
        })
    }
})

export const { clearMessage, clearError } = productSlice.actions;

export default productSlice.reducer