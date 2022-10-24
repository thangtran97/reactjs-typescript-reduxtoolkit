//@ts-nocheck
import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./index.css";
import Page from "../../components/Page";
import { Button, Col, Dropdown, Menu, MenuProps, Row, Select, Slider } from "antd";
import {
    AppstoreOutlined, BorderOutlined,
    CameraOutlined,
    CaretLeftOutlined, CaretRightOutlined,
    DoubleRightOutlined, EyeOutlined,
    MinusOutlined,
    PauseCircleOutlined, PlayCircleOutlined,
    PlusOutlined,
    SoundOutlined, StepBackwardOutlined, StepForwardOutlined, ZoomInOutlined
} from "@ant-design/icons";
import { SliderMarks } from "antd/es/slider";
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import html2canvas from "html2canvas";
import { useAppDispatch } from "../../store/hooks";
import { uploadImage } from "../../store/imageSlice";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    DEFAULT_RECORD_MAP,
    TABLE_HEADER_RECORD,
    VIDEO_1_ID,
    VIDEO_2_ID,
    VIDEO_3_ID,
    VIDEO_4_ID
} from "../../utils/constant";
import { TableCommon } from "../../components/common/TableCommon";

const MultiviewRecord: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isRewind, setIsRewind] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [durationTime, setDurationTime] = useState<number>(0);
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [rewindInterval, setRewindInterval] = useState<any>();
    const [processInterval, setProcessInterval] = useState<any>();
    const [durationPlayback, setDurationPlayback] = useState<number>(5 * 60);
    const [volume, setVolume] = useState<number>(50);
    const [scale, setScale] = useState<number>(1);
    const [video1, setVideo1] = useState<ReactElement>(<video />);
    const [video2, setVideo2] = useState<ReactElement>(<video />);
    const [video3, setVideo3] = useState<ReactElement>(<video />);
    const [video4, setVideo4] = useState<ReactElement>(<video />);

    let videoRef = useRef<HTMLVideoElement>(null);
    let panPinchRef = useRef<ReactZoomPanPinchRef>(null);
    let videoContainerRef = useRef(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        clearInterval(processInterval);
        clearInterval(rewindInterval);
        if (isPlaying) {
            const process = async () => {
                let interval = window.setInterval(() => {
                    if (videoRef.current) {
                        setCurrentTime(videoRef.current.currentTime);
                        if (durationTime != 0
                            && (videoRef.current.currentTime >= durationTime
                                || videoRef.current.currentTime >= durationPlayback)) {
                            videoRef.current.pause();
                            setIsPlaying(false);
                            videoRef.current.currentTime = 0;
                            setCurrentTime(0);
                        }
                    } else {
                        setCurrentTime(0);
                    }
                }, 500);
                setProcessInterval(interval);
            };
            process().catch();
        }

        if (videoRef.current && panPinchRef.current) {
            setVolume(videoRef.current.volume * 100);
            setPlaybackRate(videoRef.current.playbackRate);
            videoRef.current.duration < durationPlayback ? setDurationTime(videoRef.current.duration) : setDurationTime(durationPlayback);
            videoRef.current.paused ? setIsPlaying(false) : setIsPlaying(true);
            setDurationPlayback(parseInt(videoRef.current!.getAttribute("durationPlayback") || "300"));
            setScale(panPinchRef.current.state.scale);
        }


    }, [video1, video2, video3, video4, videoRef, panPinchRef, isPlaying, durationTime, durationPlayback]);

    const handleChangeDurationPlayback = (value: string | string[]) => {
        let duration = +value * 60;
        setDurationPlayback(duration);
        videoRef.current!.duration < duration ? setDurationTime(videoRef.current!.duration) : setDurationTime(duration);
        videoRef.current?.setAttribute("durationPlayback", duration.toString());
    };

    useEffect(() => {
        lstVideoPlay.set(VIDEO_1_ID, "test.mkv");
        lstVideoPlay.set(VIDEO_2_ID, "test2.mkv");
        lstVideoPlay.set(VIDEO_3_ID, "meomeo.mkv");
        lstVideoPlay.set(VIDEO_4_ID, "h264-encode.mkv");
        let v1 =
            <TransformWrapper ref={panPinchRef} maxScale={16} onZoom={handleOnZoom}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            ref={videoRef}
                            crossOrigin=""
                            style={{ border: "solid 1px orangered" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_1_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo1(event)}

                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo1(v1);

        let v2 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_2_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo2(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo2(v2);

        let v3 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_3_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo3(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo3(v3);

        let v4 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_4_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo4(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
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
        0: {
            style: {
                color: "white"
            },
            label: "00:00"
        },
        [`${durationTime}`]: {
            style: {
                color: "white"
            },
            label: tipFormatter(durationTime)
        }
    };

    const handleOnZoom = (stats: ReactZoomPanPinchRef) => {
        setScale(stats.state.scale);
    };

    const zoomIn = () => {
        let newScale = scale * Math.exp(0.693);
        panPinchRef.current?.zoomIn(0.693);
        setScale(newScale <= 16 ? newScale : 16);
    };

    const zoomOut = () => {
        panPinchRef.current?.zoomOut(0.693);
        let newScale = scale * Math.exp(-0.693);
        setScale(newScale > 1 ? newScale : 1);
    };

    const handleSeek = (value: number) => {
        setCurrentTime(value);
        videoRef.current!.currentTime = value;
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
                if (videoRef.current?.currentTime == 0) {
                    videoRef.current?.pause();
                    setIsPlaying(false);
                    window.clearInterval(interval);
                } else {
                    videoRef.current!.currentTime -= 0.055;
                }
            }, 55);
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
        let canvas: HTMLCanvasElement;
        switch (e.key) {
            case "1":
                canvas = await html2canvas(videoRef.current || document.body, {
                    width: videoRef.current!.width,
                    height: videoRef.current!.height
                });
                break;
            case "2":
                canvas = await html2canvas(videoContainerRef.current || document.body, {
                    width: videoRef.current!.width * 2,
                    height: videoRef.current!.height * 2
                });
                break;
            default:
                break;
        }

        // @ts-ignore
        let base64_image = canvas.toDataURL("image/png", 1.0);

        let req = {
            name: "img_" + Math.round(videoRef.current!.currentTime * 1000),
            image: base64_image
        };

        dispatch(uploadImage(req));
    };

    const handleClickVideo1 = (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        event.preventDefault();
        let v1 =
            <TransformWrapper ref={panPinchRef} maxScale={16} onZoom={handleOnZoom}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            ref={videoRef}
                            crossOrigin=""
                            style={{ border: "solid 1px orangered" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_1_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo1(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo1(v1);

        let v2 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_2_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo2(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo2(v2);

        let v3 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_3_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo3(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo3(v3);

        let v4 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_4_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo4(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo4(v4);
    };

    const handleClickVideo2 = (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        event.preventDefault();
        let v2 =
            <TransformWrapper ref={panPinchRef} maxScale={16} onZoom={handleOnZoom}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            ref={videoRef}
                            style={{ border: "solid 1px orangered" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_2_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo2(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo2(v2);

        let v1 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_1_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo1(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo1(v1);

        let v3 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_3_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo3(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo3(v3);

        let v4 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_4_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo4(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo4(v4);
    };

    const handleClickVideo3 = (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        event.preventDefault();
        let v3 =
            <TransformWrapper ref={panPinchRef} maxScale={16} onZoom={handleOnZoom}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            ref={videoRef}
                            style={{ border: "solid 1px orangered" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_3_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo3(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo3(v3);

        let v1 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_1_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo1(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo1(v1);

        let v2 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_2_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo2(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo2(v2);

        let v4 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_4_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo4(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo4(v4);
    };

    const handleClickVideo4 = (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        event.preventDefault();
        let v4 =
            <TransformWrapper ref={panPinchRef} maxScale={16} onZoom={handleOnZoom}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            ref={videoRef}
                            style={{ border: "solid 1px orangered" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_4_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo4(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo4(v4);

        let v1 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_1_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo1(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo1(v1);

        let v2 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_2_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo2(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo2(v2);

        let v3 =
            <TransformWrapper disabled={true}>
                <React.Fragment>
                    <TransformComponent>
                        <video
                            crossOrigin=""
                            style={{ border: "solid 1px grey" }}
                            src={"http://localhost:5000/records/play?name=" + lstVideoPlay.get(VIDEO_3_ID)}
                            width={640}
                            height={360}
                            onClick={(event) => handleClickVideo3(event)}
                        />
                    </TransformComponent>
                </React.Fragment>
            </TransformWrapper>;
        setVideo3(v3);
    };

    return (
        <Page
            content={
                <div style={{ marginTop: 10 }}>
                    <div className="record-container">
                        <div ref={videoContainerRef} className="videoContainer">
                            <Row>
                                {video1}
                                {video2}
                            </Row>
                            <Row>
                                {video3}
                                {video4}
                            </Row>
                        </div>
                        <div className="controlBarContainer">
                            <div className="controlBar">
                                <Row>
                                    <Col className="gutter-row" span={20}>
                                        <Button
                                            style={{ color: "white" }}
                                            type="link"
                                            size="small"
                                        >
                                            時間範囲
                                        </Button>
                                        <Select
                                            style={{ width: "15%" }}
                                            value={(durationPlayback / 60).toString()}
                                            onChange={handleChangeDurationPlayback}
                                        >
                                            <Select.Option value="1">1p</Select.Option>
                                            <Select.Option value="5">5p</Select.Option>
                                            <Select.Option value="12">30p</Select.Option>
                                        </Select>
                                        <Button
                                            style={{ color: "white" }}
                                            type="link"
                                            size="small"
                                        >
                                            2022/08/17
                                        </Button>
                                        <Button
                                            style={{ color: "white" }}
                                            type="link"
                                            size="small"
                                        >
                                            {tipFormatter(currentTime)}
                                        </Button>
                                    </Col>
                                    <Col className="gutter-row" span={4}>
                                        <Dropdown.Button
                                            style={{ background: "#3a414b", color: "white" }}
                                            size="small"
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
                                            style={{ background: "#3a414b", color: "white" }}
                                            size="small"

                                            placement="top"
                                            overlay={<Menu
                                                style={{
                                                    height: 100,
                                                    width: 50,
                                                    background: "#3a414b",
                                                    opacity: 0.8
                                                }}
                                                onClick={handleCapture}
                                                items={[
                                                    {
                                                        key: "1",
                                                        icon: <BorderOutlined
                                                            style={{ color: "white", fontSize: "30px" }} />
                                                    },
                                                    {
                                                        key: "2",
                                                        icon: <AppstoreOutlined
                                                            style={{ color: "white", fontSize: "30px" }} />
                                                    }
                                                ]}
                                            />}
                                            icon={<CameraOutlined />}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="gutter-row" span={24}>
                                        <Slider tooltip={{ formatter: tipFormatter }} marks={marks} min={0}
                                                max={durationTime}
                                                value={currentTime} onChange={handleSeek} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="gutter-row" span={6}>
                                        <Button
                                            style={{ color: "white" }}
                                            type="link"
                                            size="small"
                                        >
                                            速さ
                                        </Button>
                                        <Button
                                            style={{ background: "#3a414b", color: "white" }}
                                            type="default"
                                            icon={<MinusOutlined />}
                                            onClick={handleDecreasePlaybackRate}
                                            size="small"
                                        />
                                        <Button
                                            style={{ color: "white" }}
                                            type="link"
                                            icon={<DoubleRightOutlined />}
                                            size="small"
                                        >
                                            {playbackRate}
                                        </Button>
                                        <Button
                                            style={{ background: "#3a414b", color: "white" }}
                                            type="default"
                                            icon={<PlusOutlined />}
                                            onClick={handleIncreasePlaybackRate}
                                            size="small"
                                        />
                                    </Col>
                                    <Col className="gutter-row" span={8}>
                                        <Button
                                            style={{ marginLeft: "1%", background: "#3a414b", color: "white" }}
                                            shape="round"
                                            icon={<StepBackwardOutlined />}
                                            onClick={handleRevert}
                                            size="small"
                                        />
                                        <Button
                                            style={{ marginLeft: "1%", background: "#3a414b", color: "white" }}
                                            shape="round"
                                            icon={isRewind ? <CaretRightOutlined /> : <CaretLeftOutlined />}
                                            onClick={handleRewind}
                                            size="small"
                                        />
                                        <Button
                                            style={{ marginLeft: "1%", background: "#3a414b", color: "white" }}
                                            shape="round"
                                            icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                                            onClick={handlePlaying}
                                            size="small"
                                        />
                                        <Button
                                            style={{ marginLeft: "1%", background: "#3a414b", color: "white" }}
                                            shape="round"
                                            icon={<StepForwardOutlined />}
                                            onClick={handleForward}
                                            size="small"
                                        />
                                    </Col>
                                    <Col className="gutter-row" span={5}>
                                        <Button
                                            style={{ background: "#3a414b", color: "white" }}
                                            type="link"
                                            icon={<ZoomInOutlined />}
                                            size="small"
                                        />
                                        <Button
                                            style={{ background: "#3a414b", color: "white" }}
                                            type="default"
                                            icon={<MinusOutlined />}
                                            onClick={zoomOut}
                                            size="small"
                                        />
                                        <Button
                                            style={{ color: "white" }}
                                            type="link"
                                            size="small"
                                        >
                                            {scale.toFixed(1)}
                                        </Button>
                                        <Button
                                            style={{ background: "#3a414b", color: "white" }}
                                            type="default"
                                            icon={<PlusOutlined />}
                                            onClick={zoomIn}
                                            size="small"
                                        />
                                    </Col>
                                    <Col className="gutter-row" span={5}>
                                        <Button
                                            style={{ background: "#3a414b", color: "white" }}
                                            type="link"
                                            icon={<EyeOutlined />}
                                            size="small"
                                        />
                                        <Select defaultValue="10" style={{ width: "65%" }}>
                                            <Select.Option value="0">0</Select.Option>
                                            <Select.Option value="5">5</Select.Option>
                                            <Select.Option value="10">10</Select.Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                    </div>
                </div>
            }
        />
    );
};

export default MultiviewRecord;
