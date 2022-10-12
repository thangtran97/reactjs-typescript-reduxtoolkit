//@ts-nocheck
import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./index.css";
import Page from "../../components/Page";
import { Button, Col, Row, Select } from "antd";
import { useAppDispatch } from "../../store/hooks";
import WebrtcPlayer from "../../components/WebrtcPlayer";
import { CaretDownOutlined } from "@ant-design/icons";

const LiveView: React.FC = () => {
    const [openSelectLayoutCustomize, setOpenSelectLayoutCustomize] = useState(false);
    let videoContainerRef = useRef(null);
    const dispatch = useAppDispatch();

    return (
        <Page
            content={
                <div style={{ marginLeft: 100, marginTop: 10 }}>
                    <div className="record-container">
                        <div ref={videoContainerRef} className="video-container">
                            <WebrtcPlayer
                                url={"http://localhost:8083/stream/2a1e26f0-ceb0-4e7c-a989-100fa93a8fca/channel/0/webrtc?uuid=2a1e26f0-ceb0-4e7c-a989-100fa93a8fca&channel=0"}
                                width={1280}
                                height={720}
                            />
                        </div>
                        <div className="status-bar-container">
                            <div className="status-bar">
                                <Row style={{ height: 32 }}>
                                    <Col span={18}>

                                    </Col>
                                    <Col span={3}>
                                        <Button
                                            type="text"
                                            icon={<img className="icon-22"
                                                       src="/icons/status-bar/event-bell.png" />}
                                            size="small"
                                        />
                                    </Col>
                                    <Col span={3}>
                                        <Button
                                            type="text"
                                            icon={<img className="icon-22"
                                                       src="/icons/status-bar/abnormal-occurrence.png" />}
                                            size="small"
                                        />
                                    </Col>
                                </Row>
                                <Row className="status-line" />
                                <Row style={{ height: 32 }}>
                                    <Col span={1} />
                                    <Col span={17}>
                                        <img style={{ width: 50 }} src="/icons/secom_logo.png" />
                                    </Col>
                                    <Col span={3}>
                                        <Button
                                            type="text"
                                            icon={<img className="icon-22"
                                                       src="/icons/status-bar/recorder-menu.png" />}
                                            size="small"
                                        />
                                    </Col>
                                    <Col span={3}>
                                        <Button
                                            type="text"
                                            icon={<img className="icon-22"
                                                       src="/icons/status-bar/layout-change.png" />}
                                            size="small"
                                        />
                                    </Col>
                                </Row>
                                <div className="layout-menu">
                                    <Row style={{ height: 32, alignContent: "center" }}>
                                        <Button
                                            type="text"
                                            icon={<img className="icon-22"
                                                       src="/icons/status-bar/previous.png" />}
                                            size="small"
                                        />
                                        <div style={{ color: "white", alignSelf: "center" }}>
                                            4/16
                                        </div>
                                        <Button
                                            type="text"
                                            icon={<img className="icon-22"
                                                       src="/icons/status-bar/next.png" />}
                                            size="small"
                                        />
                                        <Button
                                            type="text"
                                            icon={<img className="icon-22"
                                                       src="/icons/status-bar/sequential-execution.png" />}
                                            size="small"
                                        />
                                    </Row>
                                    <Row style={{ height: 1, background: "gray" }}></Row>
                                    <div style={{ height: 96 }}>
                                        <Row style={{ textAlign: "center" }}>
                                            <Col span={8}>
                                                <Button
                                                    type="text"
                                                    icon={<img className="icon-22"
                                                               src="/icons/status-bar/1x1-screen.png" />}
                                                    size="small"
                                                />
                                            </Col>
                                            <Col span={8}>
                                                <Button
                                                    type="text"
                                                    icon={<img className="icon-22"
                                                               src="/icons/status-bar/2x2-screen.png" />}
                                                    size="small"
                                                />
                                            </Col>
                                            <Col span={8}>
                                                <Button
                                                    type="text"
                                                    icon={<img className="icon-22"
                                                               src="/icons/status-bar/3x3-screen.png" />}
                                                    size="small"
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: "center" }}>
                                            <Col span={8}>
                                                <Button
                                                    type="text"
                                                    icon={<img className="icon-22"
                                                               src="/icons/status-bar/4x3-screen.png" />}
                                                    size="small"
                                                />
                                            </Col>
                                            <Col span={8}>
                                                <Button
                                                    type="text"
                                                    icon={<img className="icon-22"
                                                               src="/icons/status-bar/4x4-screen.png" />}
                                                    size="small"
                                                />
                                            </Col>
                                            <Col span={8}>
                                                <Button
                                                    type="text"
                                                    icon={<img className="icon-22"
                                                               src="/icons/status-bar/3-display-screen.png" />}
                                                    size="small"
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: "center" }}>
                                            <Col span={8}>
                                                <Button
                                                    type="text"
                                                    icon={<img className="icon-22"
                                                               src="/icons/status-bar/6-display-screen.png" />}
                                                    size="small"
                                                />
                                            </Col>
                                            <Col style={{ alignSelf: "end" }} span={16}>
                                                <Button
                                                    className="btn-setting-layout-customize"
                                                    onClick={() => setOpenSelectLayoutCustomize(!openSelectLayoutCustomize)}
                                                >
                                                    カスタム
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                {openSelectLayoutCustomize ?
                                    <div className="select-layout-customize">
                                        <Row style={{ height: 32, alignContent: "center" }}>
                                            <div className="setting-layout-customize-info">
                                                1.
                                            </div>
                                            <Button
                                                type="text"
                                                icon={<CaretDownOutlined />}
                                                size="small"
                                            />
                                        </Row>
                                        <Row style={{ height: 1, background: "gray" }}></Row>
                                        <div className="setting-layout-customize-info-list">
                                            <Row>1.</Row>
                                            <Row>2.</Row>
                                            <Row>3.</Row>
                                            <Row>4.</Row>
                                            <Row>5.</Row>
                                            <Row>6.</Row>
                                        </div>
                                    </div> : null}
                            </div>
                            <div className="record-bar">

                            </div>
                        </div>
                    </div>
                </div>
            }
        />
    );
};

export default LiveView;
