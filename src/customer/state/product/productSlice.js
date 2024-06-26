import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null
};


export const findProductById = createAsyncThunk("findProductById", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/products/id/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
// export const getAllProducts = createAsyncThunk('getAllProducts', async ( thunkAPI) => {
//     try {
//         const {      color, sizes, brand,category, minPrice, maxPrice, sort, pageNumber, pageSize } = Filterdata;
//         //?category=${category}&color=${color}&sizes=${sizes}&brand=${brand}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}&pageNumber=${pageNumber}&pageSize=${pageSize}
//         const response = await axios.get("https://backend-c37y.onrender.com/api/products/");
//             return  response.data;
//     } catch (error) {

//         return thunkAPI.rejectWithValue(error.response.data);
//     }
// });
export const getAllProducts = createAsyncThunk('getAllProducts', async ( thunkAPI) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/products/`);
                return  response.data.content;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const productReducer = createSlice({
    name: "products",
    initialState,
    extraReducers: {
        [getAllProducts.pending]: (state) => {
            state.loading = true;
        },
        [getAllProducts.fulfilled]: (state, action) => {
          console.log(action.payload);
            state.loading = false;
            state.products = action.payload;
        },
        [getAllProducts.rejected]: (state, action) => {
            console.log("kkk",action.payload);
            state.loading = false;
            state.error = 'Unknown error occurred';
        },
        [findProductById.pending]: (state) => {
            state.loading = true;
        },
        [findProductById.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        [findProductById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error ? action.error.message : 'Unknown error occurred';
        }
    }
});

export default productReducer.reducer;
