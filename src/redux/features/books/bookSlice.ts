import { createSlice } from "@reduxjs/toolkit";

interface BookState {
    value: string;
}

const initialState: BookState = {
    value: "This is book title"
};

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {

    }
})

export default bookSlice.reducer