export interface RecordState {
    isLoading: boolean;
    isSuccessful: boolean;
    values: String[];
}

export interface GetListRecordResponse {
    success: boolean;
    total: number;
    data: String[];
}
