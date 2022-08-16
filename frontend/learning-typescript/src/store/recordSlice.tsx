import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { GetListRecordResponse, RecordState } from "../types/RecordType";
import RecordService from "../services/RecordService";

const initialState: RecordState = {
    isLoading: false,
    isSuccessful: false,
    values: [],
};

export const getAllRecord = createAsyncThunk("record/getAll", async () => {
    let response = await RecordService.getAll();
    return response.data as GetListRecordResponse;
});

export const recordSlice = createSlice({
    name: "record",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(getAllRecord.pending, state => {
            state.isLoading = true;
        });

        builder.addCase(getAllRecord.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccessful = true;
            state.values = action.payload.data;
        });
    }
});


export const selectIsLoading = (state: RootState) => state.record.isLoading;
export const selectIsSuccessful = (state: RootState) =>
    state.record.isSuccessful;
export const selectRecordList = (state: RootState) => state.record.values;

export default recordSlice.reducer;
