import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        addBooking: (state, action) => {
            state.items.push({
                id: Date.now(),
                ...action.payload,
            });
        },
    },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;