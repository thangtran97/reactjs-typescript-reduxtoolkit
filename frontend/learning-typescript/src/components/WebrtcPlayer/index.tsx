import React, {CSSProperties, useEffect, useRef, useState} from "react";
import "antd/dist/antd.css";
import "./index.css";
import {CloseOutlined, LoadingOutlined} from "@ant-design/icons";
import {Button, Spin} from "antd";

interface PropTypes {
    url: string;
    width?: number | string;
    height?: number | string;
    style?: CSSProperties;
    onClick?: React.MouseEventHandler<HTMLVideoElement>;
    onClose?: React.MouseEventHandler<HTMLVideoElement>;
    hasClose?: boolean;
    id?: string;
}

const config = {
    iceServers: [{
        urls: ["stun:stun.l.google.com:19302"]
    }]
};

const circleIcon = <LoadingOutlined style={{fontSize: 32, color: "#3a414b"}} spin/>;

const WebrtcPlayer: React.FC<PropTypes> = (props) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const videoRef = useRef<HTMLVideoElement>(null);
    let peerConnection: RTCPeerConnection;
    let mediaStream: MediaStream;

    const startPlay = async () => {
        mediaStream = new MediaStream();
        videoRef.current!.srcObject = mediaStream;
        peerConnection = new RTCPeerConnection(config);
        peerConnection.onnegotiationneeded = handleNegotiationNeeded;
        peerConnection.onsignalingstatechange = signalingstatechange;

        peerConnection.ontrack = onTrack;
        let offer = await peerConnection.createOffer({
            //iceRestart:true,
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
        });
        await peerConnection.setLocalDescription(offer);

    };

    const onTrack = (event: RTCTrackEvent) => {
        mediaStream.addTrack(event.track);
    };

    const setRemoteDescription = async () => {
        // let url = "http://localhost:8083/stream/6279629d-eb8e-4b87-a03f-43adb05f2ecc/channel/0/webrtc?uuid=6279629d-eb8e-4b87-a03f-43adb05f2ecc&channel=0";
        let requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
            body: new URLSearchParams({
                data: window.btoa(peerConnection.localDescription?.sdp || "")
            })
        };
        fetch(props.url, requestOptions)
            .then(response => response.text())
            .then(data => {
                try {
                    peerConnection.setRemoteDescription(new RTCSessionDescription({
                        type: "answer",
                        sdp: window.atob(data)
                    }));
                } catch (e) {
                    console.warn(e);
                }
            });
    };

    const signalingstatechange = async () => {
        switch (peerConnection.signalingState) {
            case "have-local-offer":
                await setRemoteDescription();
                break;
            case "stable":
                /*
                * There is no ongoing exchange of offer and answer underway.
                * This may mean that the RTCPeerConnection object is new, in which case both the localDescription and remoteDescription are null;
                * it may also mean that negotiation is complete and a connection has been established.
                */
                break;

            case "closed":
                /*
                 * The RTCPeerConnection has been closed.
                 */
                break;

            default:
                console.log(`unhandled signalingState is ${peerConnection.signalingState}`);
                break;
        }
    };

    const handleNegotiationNeeded = async () => {
        let offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        await setRemoteDescription();
    };

    const handleDbClick = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen({navigationUI: "auto"}).catch()
        }
    }

    const handleOnPlaying = () => {
        setIsPlaying(true)
    }

    useEffect(() => {
        startPlay().catch();

        return () => {
            peerConnection?.close();
        };
    }, []);

    return (
        <div className="webrtc-container">
            {/*<Spin className="webrtc-spinner"*/}
            {/*      indicator={circleIcon}*/}
            {/*      spinning={!isPlaying}*/}
            {/*/>*/}
            <video
                ref={videoRef}
                autoPlay={true}
                controls={false}
                style={props.style || undefined}
                width={props.width || undefined}
                height={props.height || undefined}
                muted
                // onPlaying={handleOnPlaying}
                onDoubleClick={handleDbClick}
                onClick={props.onClick}
                id={"stream-" + props.id}
            />
            {props.hasClose ?
                <Button
                    style={{position: "absolute", top: 0, left: 0, opacity: 0.8}}
                    type="text"
                    shape="circle"
                    icon={<CloseOutlined/>}
                    onClick={props.onClose}
                /> : null
            }

        </div>
    );

};

export default WebrtcPlayer;
