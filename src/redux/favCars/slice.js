import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favCars: [],
};

const favCarsSlice = createSlice({
    name: "favoritesCars",
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const exists = state.favCars.find((car) => car.id === action.payload.id);

            if (exists) {
                state.favCars = state.favCars.filter((car) => car.id !== action.payload.id);
            }
            else {
                state.favCars.push(action.payload);
            }
        }
    },
});

export const { toggleFavorite } = favCarsSlice.actions;
export default favCarsSlice.reducer;