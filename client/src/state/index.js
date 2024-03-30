import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    userId: "63701cc1f03239c72c000181",
};

export const globalslice = createSlice({
    name : "global",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode === "light" ? "dark" : "light";
        }
    }
})

export const { setMode } = globalslice.actions;

export default globalslice.reducer;