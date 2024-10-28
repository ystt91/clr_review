import {getCartItems} from "../api/cartApi";

export const getCartItemsAsync = createAyncThunk('getCartItemsAsync', () => {
    return getCartItems()
})

export const postChangeCartAsync = createAyncThunk('postChangeCartAsync',(param)=>{
    return postChangeCartAsync(param)
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