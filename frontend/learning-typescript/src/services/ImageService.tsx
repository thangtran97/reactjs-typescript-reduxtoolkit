import axiosClient from "../utils/axios";
import { UploadImageRequest, UploadImageResponse } from "../types/ImageType";

export const upload = async (data: UploadImageRequest) => {
    return await axiosClient.post<UploadImageResponse>("/images", data);
};

const ImageService = {
    upload
};

export default ImageService;
