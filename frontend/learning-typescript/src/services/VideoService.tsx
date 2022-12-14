import axiosClient from "../utils/axios";
import {
    CreateVideoResponse,
    DeleteVideoResponse,
    EditVideoResponse,
    GetListVideoResponse,
    GetVideoResponse, VideoCompositing,
    VideoInfo
} from "../types/VideoType";

export const getAll = async () => {
    return await axiosClient.get<GetListVideoResponse>("/videos");
};

export const getDetail = async (id: number) => {
    return await axiosClient.get<GetVideoResponse>(`/videos/${id}`);
};

export const create = async (video: VideoInfo) => {
    return await axiosClient.post<CreateVideoResponse>("/videos", video);
};

export const edit = async (video: VideoInfo) => {
    return await axiosClient.put<EditVideoResponse>(
        `/videos/${video.id}`,
        video
    );
};

export const compositing = async (data: VideoCompositing) => {
    return await axiosClient.post("/videos/compositing", data);
};

export const remove = async (id: number) => {
    return await axiosClient.delete<DeleteVideoResponse>(`videos/${id}`);
};

const VideoService = {
    getAll,
    getDetail,
    create,
    edit,
    remove,
    compositing,
};

export default VideoService;
