import React, { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import "./index.css";
import Page from "../../components/Page";
import { useParams } from "react-router-dom";
import { Button, Col, Dropdown, Menu, MenuProps, Row, Select, Slider } from "antd";
import {
    AppstoreOutlined, BorderOutlined,
    CameraOutlined,
    CaretLeftOutlined, CaretRightOutlined,
    DoubleRightOutlined, EyeOutlined,
    MinusOutlined,
    MinusSquareOutlined, PauseCircleOutlined, PauseOutlined, PlayCircleOutlined,
    PlusOutlined,
    SoundOutlined, StepBackwardOutlined, StepForwardOutlined, ZoomInOutlined
} from "@ant-design/icons";
import { SliderMarks } from "antd/es/slider";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import html2canvas from "html2canvas";
import { useAppDispatch } from "../../store/hooks";
import { getDetailVideo } from "../../store/videoSlice";
import { UploadImageRequest } from "../../types/ImageType";
import { uploadImage } from "../../store/imageSlice";

const MultiviewRecord: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isRewind, setIsRewind] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [durationTime, setDurationTime] = useState<number>(0);
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [rewindInterval, setRewindInterval] = useState<any>();
    const [processInterval, setProcessInterval] = useState<any>();
    const [volume, setVolume] = useState<number>(50);
    const [video1, setVideo1] = useState<ReactElement>(<video />);
    const [video2, setVideo2] = useState<ReactElement>(<video />);
    const [video3, setVideo3] = useState<ReactElement>(<video />);
    const [video4, setVideo4] = useState<ReactElement>(<video />);
    const [imgSrc, setImgSrc] = useState<string>("");
    const { name } = useParams();
    let videoRef = useRef<HTMLVideoElement>(null);
    let videoContainerRef = useRef(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        clearInterval(processInterval);
        const process = async () => {
            let interval = window.setInterval(() => {
                if (videoRef.current) {
                    setCurrentTime(videoRef.current.currentTime);
                    if (videoRef.current.currentTime == videoRef.current.duration) {
                        setIsPlaying(false);
                    }
                } else {
                    setCurrentTime(0);
                }
            }, 500);
            setProcessInterval(interval);
        };
        process().catch();

        if (videoRef.current) {
            setVolume(videoRef.current.volume * 100);
            setPlaybackRate(videoRef.current.playbackRate);
            videoRef.current.paused ? setIsPlaying(false) : setIsPlaying(true);
        }
    }, [video1, video2, videoRef]);

    useEffect(() => {
        let v1 =
            <video
                ref={videoRef}
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test.mkv"}
                width={640}
                height={360}
                onDurationChange={handleDurationChange}
                onClick={(event) => handleClickVideo1(event)}
            />;
        setVideo1(v1);

        let v2 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test2.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo2(event)}
            />;
        setVideo2(v2);

        let v3 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test2.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo3(event)}
            />;
        setVideo3(v3);

        let v4 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo4(event)}
            />;
        setVideo4(v4);
    }, []);

    const tipFormatter = (value: number | undefined) => {
        if (!value) {
            return `00:00`;
        }
        const date = new Date(value * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, "0");
        if (hh) {
            return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
        }
        return `${mm}:${ss}`;
    };

    const marks: SliderMarks = {
        0: "00:00",
        [`${durationTime}`]: tipFormatter(durationTime)
    };

    const handleSeek = (value: number) => {
        setCurrentTime(value);
        videoRef.current!.currentTime = value;
    };

    const handleDurationChange = () => {
        setDurationTime(videoRef.current!.duration);
    };

    const handleVolume = (value: number) => {
        setVolume(value);
        videoRef.current!.volume = value / 100;
    };

    const handleIncreasePlaybackRate = () => {
        let newPlaybackRate = playbackRate * 2;
        videoRef.current!.playbackRate = newPlaybackRate;
        setPlaybackRate(newPlaybackRate);
    };

    const handleDecreasePlaybackRate = () => {
        let newPlaybackRate = playbackRate / 2;
        videoRef.current!.playbackRate = newPlaybackRate;
        setPlaybackRate(newPlaybackRate);
    };

    const handlePlaying = () => {
        if (isPlaying) {
            videoRef.current?.pause();
            setIsPlaying(false);
            clearInterval(rewindInterval);
            setIsRewind(false);
        } else {
            videoRef.current?.play();
            setIsPlaying(true);
        }
    };

    const handleRewind = () => {
        let rewind = !isRewind;
        setIsRewind(rewind);
        if (rewind) {
            let interval = window.setInterval(() => {
                console.log("rewind");
                if (videoRef.current?.currentTime == 0) {
                    videoRef.current?.pause();
                    setIsPlaying(false);
                    window.clearInterval(interval);
                } else {
                    videoRef.current!.currentTime += -0.1;
                }
            }, 50);
            setRewindInterval(interval);
        } else {
            clearInterval(rewindInterval);
        }
    };

    const handleForward = () => {
        videoRef.current!.currentTime += 5;
    };

    const handleRevert = () => {
        videoRef.current!.currentTime -= 5;
    };

    const handleCapture: MenuProps["onClick"] = async e => {
        console.log(e);
        let canvas: HTMLCanvasElement;
        switch (e.key) {
            case "1":
                canvas = await html2canvas(videoRef.current || document.body, { useCORS: false });
                break;
            case "2":
                canvas = await html2canvas(videoContainerRef.current || document.body, { useCORS: false });
                break;
            default:
                break;
        }

        // @ts-ignore
        let base64_image = canvas.toDataURL("image/png", 1.0);
        setImgSrc(base64_image);

        let req = {
            name: "test_" + Math.round(videoRef.current!.currentTime * 1000),
            image: base64_image
        };

        dispatch(uploadImage(req));
    };

    const handleClickVideo1 = (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        event.preventDefault();
        let v1 =
            <video
                ref={videoRef}
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test.mkv"}
                width={640}
                height={360}
                onDurationChange={handleDurationChange}
                onClick={(event) => handleClickVideo1(event)}
            />;
        setVideo1(v1);

        let v2 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test2.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo2(event)}
            />;
        setVideo2(v2);

        let v3 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test2.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo3(event)}
            />;
        setVideo3(v3);

        let v4 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo4(event)}
            />;
        setVideo4(v4);
    };

    const handleClickVideo2 = (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        event.preventDefault();
        let v2 =
            <video
                crossOrigin="anonymous"
                ref={videoRef}
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test2.mkv"}
                width={640}
                height={360}
                onDurationChange={handleDurationChange}
                onClick={(event) => handleClickVideo2(event)}
            />;
        setVideo2(v2);

        let v1 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo1(event)}
            />;
        setVideo1(v1);

        let v3 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test2.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo3(event)}
            />;
        setVideo3(v3);

        let v4 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo4(event)}
            />;
        setVideo4(v4);
    };

    const handleClickVideo3 = (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        event.preventDefault();
        let v3 =
            <video
                crossOrigin="anonymous"
                ref={videoRef}
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test2.mkv"}
                width={640}
                height={360}
                onDurationChange={handleDurationChange}
                onClick={(event) => handleClickVideo3(event)}
            />;
        setVideo3(v3);

        let v1 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo1(event)}
            />;
        setVideo1(v1);

        let v2 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test2.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo2(event)}
            />;
        setVideo2(v2);

        let v4 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo4(event)}
            />;
        setVideo4(v4);
    };

    const handleClickVideo4 = (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        event.preventDefault();
        let v4 =
            <video
                crossOrigin="anonymous"
                ref={videoRef}
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test.mkv"}
                width={640}
                height={360}
                onDurationChange={handleDurationChange}
                onClick={(event) => handleClickVideo4(event)}
            />;
        setVideo4(v4);

        let v1 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo1(event)}
            />;
        setVideo1(v1);

        let v2 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test2.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo2(event)}
            />;
        setVideo2(v2);

        let v3 =
            <video
                crossOrigin="anonymous"
                style={{margin: 5}}
                src={"http://localhost:5000/records/play?name=test2.mkv"}
                width={640}
                height={360}
                onClick={(event) => handleClickVideo3(event)}
            />;
        setVideo3(v3);
    };


    return (
        <Page
            content={
                <div style={{ marginLeft: 100, marginTop: 10 }}>
                    <TransformWrapper>
                        {({ zoomIn, zoomOut, state, ...rest }) => (
                            <React.Fragment>
                                <div ref={videoContainerRef} className="videoContainer">
                                    <TransformComponent>
                                        {video1}
                                        {video2}
                                        {video3}
                                        {video4}
                                    </TransformComponent>
                                </div>

                                <div className="controlBar">
                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        <Col className="gutter-row" span={20}>
                                            <Button
                                                type="link"
                                                size="large"
                                            >
                                                時間範囲
                                            </Button>
                                            <Select defaultValue="12" style={{ width: "10%" }}>
                                                <Select.Option value="1">1h</Select.Option>
                                                <Select.Option value="5">5h</Select.Option>
                                                <Select.Option value="12">12h</Select.Option>
                                            </Select>
                                            <Button
                                                type="link"
                                                size="large"
                                            >
                                                2022/08/17
                                            </Button>
                                            <Button
                                                type="link"
                                                size="large"
                                            >
                                                {tipFormatter(currentTime)}
                                            </Button>
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            <Dropdown.Button
                                                placement="top"
                                                overlay={
                                                    <div
                                                        style={{ height: 50 }}
                                                    >
                                                        <Slider
                                                            vertical
                                                            value={volume}
                                                            onChange={handleVolume}
                                                        />
                                                    </div>
                                                }
                                                icon={<SoundOutlined />}
                                            />
                                            <Dropdown.Button
                                                placement="top"
                                                overlay={<Menu
                                                    style={{ height: 100, width: 50 }}
                                                    onClick={handleCapture}
                                                    items={[
                                                        {
                                                            key: "1",
                                                            icon: <BorderOutlined style={{ fontSize: "30px" }} />
                                                        },
                                                        {
                                                            key: "2",
                                                            icon: <AppstoreOutlined style={{ fontSize: "30px" }} />
                                                        }
                                                    ]}
                                                />}
                                                icon={<CameraOutlined />}
                                            />
                                        </Col>
                                        <Col className="gutter-row" span={24}>
                                            <Slider tipFormatter={tipFormatter} marks={marks} min={0} max={durationTime}
                                                    value={currentTime} onChange={handleSeek} />
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            <Button
                                                type="link"
                                                size="large"
                                            >
                                                速さ
                                            </Button>
                                            <Button
                                                type="default"
                                                icon={<MinusOutlined />}
                                                onClick={handleDecreasePlaybackRate}
                                            />
                                            <Button
                                                type="link"
                                                icon={<DoubleRightOutlined />}
                                                size="large"
                                            >{playbackRate}</Button>
                                            <Button
                                                type="default"
                                                icon={<PlusOutlined />}
                                                onClick={handleIncreasePlaybackRate}
                                            />
                                        </Col>
                                        <Col className="gutter-row" span={12}>
                                            <Button
                                                style={{ marginLeft: "1%" }}
                                                shape="round"
                                                icon={<StepBackwardOutlined />}
                                                onClick={handleRevert}
                                            />
                                            <Button
                                                style={{ marginLeft: "1%" }}
                                                shape="round"
                                                icon={isRewind ? <CaretRightOutlined /> : <CaretLeftOutlined />}
                                                onClick={handleRewind}
                                            />
                                            <Button
                                                style={{ marginLeft: "1%" }}
                                                shape="round"
                                                icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                                                onClick={handlePlaying}
                                            />
                                            <Button
                                                style={{ marginLeft: "1%" }}
                                                shape="round"
                                                icon={<StepForwardOutlined />}
                                                onClick={handleForward}
                                            />
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            <Button
                                                type="link"
                                                icon={<ZoomInOutlined />}
                                                size="large"
                                            />
                                            <Button
                                                type="default"
                                                icon={<MinusOutlined />}
                                                onClick={() => zoomOut(0.7)}
                                            />
                                            <Button
                                                type="link"
                                                size="large"
                                            >
                                                {state.scale.toFixed(1)}
                                            </Button>
                                            <Button
                                                type="default"
                                                icon={<PlusOutlined />}
                                                onClick={() => zoomIn(0.7)}
                                            />
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            <Button
                                                type="link"
                                                icon={<EyeOutlined />}
                                                size="large"
                                            />
                                            <Select defaultValue="10" style={{ width: "30%" }}>
                                                <Select.Option value="0">0</Select.Option>
                                                <Select.Option value="5">5</Select.Option>
                                                <Select.Option value="10">10</Select.Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </div>
                            </React.Fragment>
                        )}
                    </TransformWrapper>
                </div>
            }
        />
    );
};

export default MultiviewRecord;
