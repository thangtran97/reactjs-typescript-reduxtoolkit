export interface ImageState {
    isLoading: boolean;
    isSuccessful: boolean;
}

export interface UploadImageRequest {
    name: string;
    image: string;
}

export interface UploadImageResponse {
    success: boolean;
}
