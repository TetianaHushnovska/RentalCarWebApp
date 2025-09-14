import { createSlice } from "@reduxjs/toolkit"
import { fetchCarById, fetchCars, getBrands } from "./operations";

const initialState = {
    cars: [],
    currentCar: null,
    brands: [],
    prices: [],
    page: 1,
    total: 0,
    filters: {
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
    },
    isLoading: false,
    error: null,
};

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        resetFilters(state) {
            state.filters = {
                brand: "",
                rentalPrice: "",
                minMileage: "",
                maxMileage: "",
            };
        },
        resetCars: (state) => {
            state.cars = [];
            state.page = 1;
            state.total = 0;
            state.error = null;
        },
        loadMore: (state) => {
            state.page += 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.isLoading = false;
                
                if (state.page === 1) {
                    state.cars = action.payload.cars;
                }
                else {
                    state.cars = [...state.cars, ...action.payload.cars];
                }

                state.total = action.payload.totalCars;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchCarById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCarById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentCar = action.payload;
            })
            .addCase(fetchCarById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getBrands.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.brands = action.payload;
                state.isLoading = false;
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
        })
    }
});

export const { setFilter, resetFilters, resetCars, loadMore } = carsSlice.actions;
export default carsSlice.reducer;