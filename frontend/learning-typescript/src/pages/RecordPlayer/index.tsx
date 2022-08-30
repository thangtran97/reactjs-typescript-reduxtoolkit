import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./index.css";
import Page from "../../components/Page";
import { useParams } from "react-router-dom";
import { Button, Col, Dropdown, Menu, Row, Select, Slider } from "antd";
import {
    AppstoreOutlined, BorderOutlined,
    CameraOutlined,
    CaretLeftOutlined, CaretRightOutlined,
    DoubleRightOutlined, EyeOutlined,
    MinusOutlined,
    MinusSquareOutlined, PauseCircleOutlined, PauseOutlined, PlayCircleOutlined,
    PlusOutlined,
    PlusSquareOutlined, SoundOutlined, StepBackwardOutlined, StepForwardOutlined, ZoomInOutlined
} from "@ant-design/icons";
import { SliderMarks } from "antd/es/slider";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const RecordPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isRewind, setIsRewind] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [durationTime, setDurationTime] = useState<number>(0);
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [rewindInterval, setRewindInterval] = useState<any>();
    const [volume, setVolume] = useState<number>(50);
    const [video1, setVideo1] = useState<ReactElement>(<video/>);
    const { name } = useParams();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const process = async () => {
            window.setInterval(() => {
                setCurrentTime(videoRef.current!.currentTime);
            }, 500);
        };
        process().catch();
        videoRef.current!.volume = 0.5;
    }, []);

    // useEffect(() => {
    //     let v1 = <video
    //         ref={videoRef}
    //         src={"http://localhost:5000/records/play?name=" + name}
    //         width={1366}
    //         height={768}
    //         onDurationChange={handleDurationChange}
    //         onClick={(event) => {
    //             event.preventDefault();
    //         }}
    //     />
    //     // setVideo1()
    // })

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
            setRewindInterval(interval)
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

    return (
        <Page
            content={
                <div style={{ marginLeft: 100, marginTop: 10 }}>
                    <TransformWrapper>
                        {({ zoomIn, zoomOut, state, ...rest }) => (
                            <React.Fragment>
                                <TransformComponent>
                                    <video
                                        ref={videoRef}
                                        src={"http://localhost:5000/records/play?name=" + name}
                                        width={1366}
                                        height={768}
                                        onDurationChange={handleDurationChange}
                                        onClick={(event) => {
                                            event.preventDefault();
                                        }}
                                    />
                                </TransformComponent>

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
                                                shape="round"
                                                icon={<StepBackwardOutlined />}
                                                onClick={handleRevert}
                                            />
                                            <Button
                                                shape="round"
                                                icon={isRewind ? <CaretRightOutlined/> : <CaretLeftOutlined />}
                                                onClick={handleRewind}
                                            />
                                            <Button
                                                shape="round"
                                                icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                                                onClick={handlePlaying}
                                            />
                                            <Button
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

export default RecordPlayer;
