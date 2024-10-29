import {getCartItems, postChangeCart} from "../api/cartApi";
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () => {
    return getCartItems()
})

export const postChangeCartAsync = createAsyncThunk('postChangeCartAsync',(param)=>{
    return postChangeCart(param)
})

const initState = []

const cartSlice = createSlice({
    name:'cartSlice',
    initialState: initState,

    extraReducers : (builder) => {
        builder.addCase(getCartItemsAsync.fulfilled, (state, action)=>{

            console.log("getCartItemsAsync.fulfilled")
            console.log(action.payload)

            return action.payload
        })
            .addCase(postChangeCartAsync.fulfilled, (state, action) => {
                console.log("postChangeCartAsync.fulfilled")

                return action.payload
            })
    }
})

export default cartSlice.reducer