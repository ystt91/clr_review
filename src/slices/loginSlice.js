import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginPost} from "../api/memberApi";
import {getCookie, removeCookie, setCookie} from "../util/cookieUtil";

const initState = {
    email:''
}

const loadMemberCookie = () => {

    const memberInfo = getCookie('member')

    return memberInfo

}

export const loginPostAsync =
    createAsyncThunk('loginPostAsync', (param)=> loginPost(param))

const loginSlice = createSlice({
    name:'loginSlice',
    initialState : loadMemberCookie() || initState ,
    reducers:{
        login: (state, action) => { // state : 기존 상태 / action : 전달할 데이터
            console.log("login............", action)
            console.log(action.payload)
            console.log("------------------------------------")
            return {email:action.payload.email} // new state ( 새로운 상태 ) useSelector가 영향 받는다.
        },
        logout: () => {
            console.log("logout..........")

            removeCookie("member")

            return {...initState}
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(loginPostAsync.fulfilled, (state, action) => {
                console.log("fulfilled")

                const payload = action.payload

                if(!payload.error){
                    setCookie("member", JSON.stringify(payload), 1);
                }

                return payload
            })
            .addCase(loginPostAsync.pending, (state, action) => {
                console.log("pending")
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                console.log("rejected")
            })
    }
})

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;