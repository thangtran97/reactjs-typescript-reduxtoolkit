import React, { RefObject, useEffect } from "react";
import "antd/dist/antd.css";
import Page from "../../components/Page";
import "video.js/dist/video-js.css";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";
import ReactHlsPlayer from "react-hls-player";
import {
    compositingVideo,
    selectIsComposited,
} from "../../store/videoSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const HomePage: React.FC = () => {
    const playerRef: RefObject<any> = React.useRef();
    const dispatch = useAppDispatch();
    const isComposited = useAppSelector(selectIsComposited);

    useEffect(() => {
        if (!isComposited) {
            let data ={
                videos: [
                    "rtsp://rtsp.stream/pattern",
                    "rtsp://rtsp.stream/pattern",
                    "rtsp://rtsp.stream/pattern",
                    "rtsp://rtsp.stream/pattern"
                ]
            };
            dispatch(compositingVideo(data));
        }
    });

    return (
        <Page
            content={
                <div style={{ marginLeft: 100, marginTop: 10 }}>
                    <ReactHlsPlayer
                        src="http://localhost:5000/files?file=playlist.m3u8"
                        autoPlay={true}
                        controls={true}
                        width={1366}
                        height={768}
                        muted={true}
                        playerRef={playerRef}
                    />
                </div>
            }
        />
    );

};

export default HomePage;
