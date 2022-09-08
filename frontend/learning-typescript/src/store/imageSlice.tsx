import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { ImageState, UploadImageRequest, UploadImageResponse } from "../types/ImageType";
import ImageService from "../services/ImageService";

const initialState: ImageState = {
    isLoading: false,
    isSuccessful: false,
};

export const uploadImage = createAsyncThunk(
    "image/upload",
    async (data: UploadImageRequest, thunkAPI) => {
        let response = await ImageService.upload(data);
        return response.data as UploadImageResponse;
    }
);

export const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(uploadImage.pending, state => {
            state.isLoading = true;
        });

        builder.addCase(uploadImage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccessful = true;
        });
    }
});


export const selectIsLoading = (state: RootState) => state.record.isLoading;
export const selectIsSuccessful = (state: RootState) =>
    state.record.isSuccessful;

export default imageSlice.reducer;
