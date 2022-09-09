import { GetListStreamResponse } from "../types/StreamType";

export const getAll = async () => {
    let requestOptions = {
        method: "GET",
        headers: { 'Authorization': 'Basic ' + window.btoa('demo:demo') },
    };
    const response = await fetch("http://127.0.0.1:8083/streams", requestOptions);
    return (await response.json()) as GetListStreamResponse;
};

const StreamService = {
    getAll
};

export default StreamService;