import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { GetListStreamResponse, Stream, StreamState } from "../types/StreamType";
import StreamService from "../services/StreamService";
import { videoSlice } from "./videoSlice";

const initialState: StreamState = {
    isLoading: false,
    isSuccessful: false,
    currentIndex: 0,
    values: []
};

export const getAllStream = createAsyncThunk("streams/getAll", async () => {
    let response = await StreamService.getAll();
    return response as GetListStreamResponse;
});

export const streamSlice = createSlice({
    name: "stream",
    initialState,
    reducers: {
        setCurrentIndex: (state, action) => {
            state.currentIndex = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getAllStream.pending, state => {
            state.isLoading = true;
        });

        builder.addCase(getAllStream.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccessful = true;
            let data = action.payload.payload;
            let streams: Stream[] = [];
            let ids = Object.keys(data);
            ids.forEach((value) => {
                streams.push({
                    key: value,
                    label: data[`${value}`].name
                })
            })
            state.values = streams;
        });
    }
});

export const { setCurrentIndex } = streamSlice.actions;

export const selectIsLoading = (state: RootState) => state.stream.isLoading;
export const selectIsSuccessful = (state: RootState) => state.stream.isSuccessful;
export const selectCurrentIndex = (state: RootState) => state.stream.currentIndex;
export const selectValues = (state: RootState) => state.stream.values;

export default streamSlice.reducer;
