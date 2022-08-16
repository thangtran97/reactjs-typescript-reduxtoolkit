import axiosClient from "../utils/axios";
import { GetListRecordResponse } from "../types/RecordType";

export const getAll = async () => {
    return await axiosClient.get<GetListRecordResponse>("/records");
};

const RecordService = {
    getAll
};

export default RecordService;
