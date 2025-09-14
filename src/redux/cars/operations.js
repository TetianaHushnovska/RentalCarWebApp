import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
    "cars/fetchCars",
    async ({ page = 1, limit = 12, brand, price, minMileage, maxMileage }, thunkAPI) => {
        try {
            const { data } = await axios.get("/cars", {
                params: {
                    page,
                    limit,
                    brand,
                    rentalPrice: price,
                    minMileage,
                    maxMileage,
                },
            });
            return data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getBrands = createAsyncThunk(
    "cars/getBrands",
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get("/brands");
            return data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const fetchCarById = createAsyncThunk(
    "cars/fetchCarById",
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.get(`/cars/${id}`);
            return data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);