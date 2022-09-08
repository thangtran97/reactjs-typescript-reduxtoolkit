import React, { useEffect, useRef } from "react";
import "antd/dist/antd.css";
import "./index.css";
import Page from "../../components/Page";
import WebrtcPlayer from "../../components/WebrtcPlayer";

const config = {
    iceServers: [{
        urls: ["stun:stun.l.google.com:19302"]
    }]
};

const HomePage: React.FC = () => {

    return (
        <Page
            content={
                <div>
                    <WebrtcPlayer
                        url={"http://localhost:8083/stream/2a1e26f0-ceb0-4e7c-a989-100fa93a8fca/channel/0/webrtc?uuid=2a1e26f0-ceb0-4e7c-a989-100fa93a8fca&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        style={{marginLeft: 5}}
                        url={"http://localhost:8083/stream/41251ba0-be89-457f-8b1a-3f6a4ddaaedf/channel/0/webrtc?uuid=41251ba0-be89-457f-8b1a-3f6a4ddaaedf&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        style={{marginLeft: 5}}
                        url={"http://localhost:8083/stream/449048ef-4a96-4c22-ac02-1b6b77122e35/channel/0/webrtc?uuid=449048ef-4a96-4c22-ac02-1b6b77122e35&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        style={{marginLeft: 5}}
                        url={"http://localhost:8083/stream/4515773b-3cfb-4ca4-89ad-a1bdc7bacbe6/channel/0/webrtc?uuid=4515773b-3cfb-4ca4-89ad-a1bdc7bacbe6&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        url={"http://localhost:8083/stream/5334db8c-22b6-4fba-85ef-1f1d083d1651/channel/0/webrtc?uuid=5334db8c-22b6-4fba-85ef-1f1d083d1651&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        style={{marginLeft: 5}}
                        url={"http://localhost:8083/stream/610f7bdb-6a43-452d-9235-3a49a692f17a/channel/0/webrtc?uuid=610f7bdb-6a43-452d-9235-3a49a692f17a&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        style={{marginLeft: 5}}
                        url={"http://localhost:8083/stream/6279629d-eb8e-4b87-a03f-43adb05f2ecc/channel/0/webrtc?uuid=6279629d-eb8e-4b87-a03f-43adb05f2ecc&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        style={{marginLeft: 5}}
                        url={"http://localhost:8083/stream/95269568-288b-4fe6-b36c-86ade2963135/channel/0/webrtc?uuid=95269568-288b-4fe6-b36c-86ade2963135&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        url={"http://localhost:8083/stream/b1e216b0-2361-440c-b2fc-2e25dcffe532/channel/0/webrtc?uuid=b1e216b0-2361-440c-b2fc-2e25dcffe532&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        style={{marginLeft: 5}}
                        url={"http://localhost:8083/stream/c5356d49-ab22-4843-ac7c-1f948f2d8bb3/channel/0/webrtc?uuid=c5356d49-ab22-4843-ac7c-1f948f2d8bb3&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        style={{marginLeft: 5}}
                        url={"http://localhost:8083/stream/c6f9ded4-8e45-419e-9eb7-0a51e2985737/channel/0/webrtc?uuid=c6f9ded4-8e45-419e-9eb7-0a51e2985737&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        style={{marginLeft: 5}}
                        url={"http://localhost:8083/stream/d24cf138-96eb-4252-a12a-94f419510b9f/channel/0/webrtc?uuid=d24cf138-96eb-4252-a12a-94f419510b9f&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        url={"http://localhost:8083/stream/41251ba0-be89-457f-8b1a-3f6a4ddaaedf/channel/0/webrtc?uuid=41251ba0-be89-457f-8b1a-3f6a4ddaaedf&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        style={{marginLeft: 5}}
                        url={"http://localhost:8083/stream/41251ba0-be89-457f-8b1a-3f6a4ddaaedf/channel/0/webrtc?uuid=41251ba0-be89-457f-8b1a-3f6a4ddaaedf&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        style={{marginLeft: 5}}
                        url={"http://localhost:8083/stream/41251ba0-be89-457f-8b1a-3f6a4ddaaedf/channel/0/webrtc?uuid=41251ba0-be89-457f-8b1a-3f6a4ddaaedf&channel=0"}
                        width={390}
                        height={220}
                    />
                    <WebrtcPlayer
                        style={{marginLeft: 5}}
                        url={"http://localhost:8083/stream/41251ba0-be89-457f-8b1a-3f6a4ddaaedf/channel/0/webrtc?uuid=41251ba0-be89-457f-8b1a-3f6a4ddaaedf&channel=0"}
                        width={390}
                        height={220}
                    />
                </div>
            }
        />
    );

};

export default HomePage;
