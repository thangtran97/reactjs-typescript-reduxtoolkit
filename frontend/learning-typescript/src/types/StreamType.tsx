export interface StreamState {
    isLoading: boolean;
    isSuccessful: boolean;
    currentIndex: number;
    values: Stream[];
}

export interface Stream {
    key: string;
    label: string;
}

export interface GetListStreamResponse {
    status: number;
    payload: {
        [key: string]: {
            name: string;
            chanel: {
                [key: string]: {
                    url?: string;
                    status?: number;
                    audio?: boolean;
                }
            }
        }
    };
}

export interface StreamPositionState {
    isLoading: boolean;
    isSuccessful: boolean;
    values: StreamPosition[];
}

export interface StreamPosition {
    id: number;
    position: number;
    url: string;
}