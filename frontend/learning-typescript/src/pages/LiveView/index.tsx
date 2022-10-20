//@ts-nocheck
import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./index.css";
import Page from "../../components/Page";
import { Button, Col, Menu, MenuProps, Row, Select } from "antd";
import { useAppDispatch } from "../../store/hooks";
import WebrtcPlayer from "../../components/WebrtcPlayer";
import {CaretDownOutlined, CloseOutlined, PlusOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import MenuCamera from "../../components/common/MenuCamera";

const ONE_STREAM = "1";
const FOUR_STREAM = "2";
const LiveView: React.FC = () => {
    const [openRecordMenu, setOpenRecordMenu] = useState(false);
    const [openLayoutMenu, setOpenLayoutMenu] = useState(false);
    const [openSelectLayoutCustomize, setOpenSelectLayoutCustomize] = useState(false);
    const [openKeys, setOpenKeys] = useState([]);
    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
        isNotNull: boolean;
    }>({mouseX: 0, mouseY: 0, isNotNull: false});
    const [viewMode, setViewMode] = useState<string>(ONE_STREAM);

    const rootSubmenuKeys = ["search", "setting", "recorder", "maintenance"];
    let videoContainerRef = useRef(null);
    const dispatch = useAppDispatch();

    const recordMenuItems: MenuProps["items"] = [
        {
            label: "検索",
            icon: <img className="icon-22" src="/icons/sidebar/search-play-menu.png" />,
            key: "search",
            children: [
                {
                    key: "search1",
                    label: "ＯＯＯＯ"
                },
                {
                    key: "search2",
                    label: "ＯＯＯＯ"
                },
                {
                    key: "search3",
                    label: "ＯＯＯＯ"
                },
                {
                    key: "search4",
                    label: "ＯＯＯＯ"
                }
            ]
        },
        {
            label: "設定",
            icon: <img className="icon-22" src="/icons/sidebar/settings-menu.png" />,
            key: "setting",
            children: [
                {
                    key: "cameraManagement",
                    label: "カメラ管理"
                },
                {
                    key: "cameraFunction",
                    label: "カメラ機能"
                },
                {
                    key: "recordingSetting",
                    label: "録画設定"
                },
                {
                    key: "storageManagement",
                    label: "ストレージ管理"
                },
                {
                    key: "ioContact",
                    label: "接点入出力"
                },
                {
                    key: "userManagement",
                    label: "ユーザー管理"
                },
            ]
        },
        {
            label: "履歴",
            icon: <img className="icon-22" src="/icons/sidebar/recorder-menu.png" />,
            key: "recorder",
            children: [
                {
                    key: "recorder1",
                    label: "ＯＯＯＯ"
                },
                {
                    key: "recorder2",
                    label: "ＯＯＯＯ"
                }
            ]
        },
        {
            label: "保守",
            icon: <img className="icon-22" src="/icons/sidebar/maintenance-menu.png" />,
            key: "maintenance",
            children: [
                {
                    key: "maintenance1",
                    label: "ＯＯＯＯ"
                }
            ]
        }
    ];

    const onOpenChange: MenuProps["onOpenChange"] = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            !contextMenu.isNotNull
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                    isNotNull: true
                }
                :
                {
                    mouseX: 0,
                    mouseY: 0,
                    isNotNull: false
                },
        );
    };

    const handleCloseMenuCam = () => {
        setContextMenu({mouseX: 0, mouseY: 0, isNotNull: false});
    };

    const setWidth = (position?: number) => {
        switch (viewMode) {
            case ONE_STREAM:
                return 1280;
            case FOUR_STREAM:
                return 640;
        }
    };

    const setHeight = (position?: number) => {
        switch (viewMode) {
            case ONE_STREAM:
                return 720;
            case FOUR_STREAM:
                return 360;
        }
    };

    const setBlockSize = (position?: number) => {
        switch (viewMode) {
            case ONE_STREAM:
                return "block-100";
            case FOUR_STREAM:
                return "block-50";
        }
    };

    return (
        <Page
            content={
                <div style={{ marginTop: 10 }}>
                    <div className="live-container">
                        <div className="video-info">
                            <Row>
                                camera01
                            </Row>
                            <Row>
                                1280x720
                            </Row>
                            <Row>
                                H.264
                            </Row>
                        </div>
                        <div className="recording-status">
                            <img className="icon-22" src="/icons/recording.png"/>
                        </div>
                        <div ref={videoContainerRef} className="video-container" style={{width: 1280, height: 720}}>
                            <div id="block1" className={"space-align-block " + setBlockSize(1)}>
                                <WebrtcPlayer
                                    url={"http://localhost:8083/stream/eaf6861d-8acd-4d00-b909-dba68be9832d/channel/0/webrtc?uuid=eaf6861d-8acd-4d00-b909-dba68be9832d&channel=0"}
                                    width={setWidth(1)}
                                    height={setHeight(1)}
                                    onClick={handleContextMenu}
                                />
                            </div>

                            {(viewMode != ONE_STREAM) ?
                                (<div id="block2" className={"space-align-block " + setBlockSize()}>
                                    <WebrtcPlayer
                                        url={"http://localhost:8083/stream/eaf6861d-8acd-4d00-b909-dba68be9832d/channel/0/webrtc?uuid=eaf6861d-8acd-4d00-b909-dba68be9832d&channel=0"}
                                        width={setWidth()}
                                        height={setHeight()}
                                        onClick={handleContextMenu}
                                    />
                                </div>) : null}
                            {(viewMode != ONE_STREAM) ?
                                (<div id="block3" className={"space-align-block " + setBlockSize()}>
                                    <WebrtcPlayer
                                        url={"http://localhost:8083/stream/41251ba0-be89-457f-8b1a-3f6a4ddaaedf/channel/0/webrtc?uuid=41251ba0-be89-457f-8b1a-3f6a4ddaaedf&channel=0"}
                                        width={setWidth()}
                                        height={setHeight()}
                                        onClick={handleContextMenu}
                                    />
                                </div>) : null}
                            {(viewMode != ONE_STREAM) ?
                                (<div id="block4" className={"space-align-block " + setBlockSize()}>
                                    <WebrtcPlayer
                                        url={"http://localhost:8083/stream/41251ba0-be89-457f-8b1a-3f6a4ddaaedf/channel/0/webrtc?uuid=41251ba0-be89-457f-8b1a-3f6a4ddaaedf&channel=0"}
                                        width={setWidth()}
                                        height={setHeight()}
                                        onClick={handleContextMenu}
                                    />
                                </div>) : null}
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
                                        <img style={{ width: 50 }} src="/icons/secom-logo.png" />
                                    </Col>
                                    <Col span={3}>
                                        <Button
                                            type="text"
                                            icon={<img className="icon-22"
                                                       src="/icons/status-bar/recorder-menu.png" />}
                                            size="small"
                                            onClick={() => setOpenRecordMenu(!openRecordMenu)}
                                        />
                                    </Col>
                                    <Col span={3}>
                                        <Button
                                            type="text"
                                            icon={<img className="icon-22"
                                                       src="/icons/status-bar/layout-change.png" />}
                                            size="small"
                                            onClick={() => setOpenLayoutMenu(!openLayoutMenu)}
                                        />
                                    </Col>
                                </Row>
                                {openLayoutMenu ?
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
                                                        onClick={() => setViewMode(ONE_STREAM)}
                                                    />
                                                </Col>
                                                <Col span={8}>
                                                    <Button
                                                        type="text"
                                                        icon={<img className="icon-22"
                                                                   src="/icons/status-bar/2x2-screen.png" />}
                                                        size="small"
                                                        onClick={() => setViewMode(FOUR_STREAM)}
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
                                    </div> : null}

                                {openSelectLayoutCustomize && openLayoutMenu ?
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
                            {openRecordMenu ?
                                <div className="record-bar">
                                    <Row style={{ height: 32, alignContent: "center" }}>
                                        <img className="icon-22" style={{ marginLeft: 5 }}
                                             src="/icons/status-bar/recorder-menu.png" />
                                        <Button
                                            style={{ left: 100 }}
                                            type="text"
                                            icon={<CloseOutlined style={{fontSize: 22, color: "gray"}} />}
                                            size="small"
                                            onClick={() => setOpenRecordMenu(false)}
                                        />
                                    </Row>
                                    <Menu
                                        theme="dark"
                                        mode="inline"
                                        openKeys={openKeys}
                                        onOpenChange={onOpenChange}
                                        items={recordMenuItems}
                                    />
                                </div> : null}

                        </div>
                    </div>
                    {contextMenu.isNotNull ?
                        <MenuCamera mouseX={contextMenu.mouseX}
                                    mouseY={contextMenu.mouseY}
                                    onClose={handleCloseMenuCam}/>
                        : <></>}
                </div>
            }
        />
    );
};

export default LiveView;
