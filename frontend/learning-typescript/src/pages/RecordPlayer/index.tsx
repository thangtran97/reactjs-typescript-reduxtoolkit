import React from "react";
import "video.js/dist/video-js.css";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";
import Page from "../../components/Page";
import { useParams } from "react-router-dom";

const RecordPlayer: React.FC = () => {
    const { name } = useParams();
    return (
        <Page
            content={
                <div style={{ marginTop: 10 }}>
                    <video width="1366" height="768" controls autoPlay={true}>
                        <source src={"http://localhost:5000/records/play?name=" + name} type="video/mp4" />
                    </video>
                </div>
            }
        />
    );
};

export default RecordPlayer;
