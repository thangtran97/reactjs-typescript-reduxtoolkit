//@ts-nocheck
import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./index.css";
import Page from "../../components/Page";
import { Button, Col, Menu, MenuProps, Row } from "antd";
import { useAppDispatch } from "../../store/hooks";
import WebrtcPlayer from "../../components/WebrtcPlayer";
import { CaretDownOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import MenuCamera from "../../components/common/MenuCamera";
import Select from "react-select";

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
    }>({ mouseX: 0, mouseY: 0, isNotNull: false });
    const [viewMode, setViewMode] = useState<string>(FOUR_STREAM);
    const [selectedStream, setSelectedStream] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentProfile, setCurrentProfile] = useState<number>(1);

    const rootSubmenuKeys = ["search", "setting", "recorder", "maintenance"];
    let videoContainerRef = useRef(null);
    const dispatch = useAppDispatch();
    const ip = process.env.REACT_APP_CLIENT_IP;

    const recordMenuItems: MenuProps["items"] = [
        {
            label: <div className="side-bar-menu">検索</div>,
            icon: <img className="icon-22" src="/icons/sidebar/search-play-menu.png" />,
            key: "search",
            children: [
                {
                    key: "search1",
                    label: <div className="side-bar-submenu">ＯＯＯＯ</div>
                },
                {
                    key: "search2",
                    label: <div className="side-bar-submenu">ＯＯＯＯ</div>
                },
                {
                    key: "search3",
                    label: <div className="side-bar-submenu">ＯＯＯＯ</div>
                },
                {
                    key: "search4",
                    label: <div className="side-bar-submenu">ＯＯＯＯ</div>
                }
            ]
        },
        {
            label: <div className="side-bar-menu">設定</div>,
            icon: <img className="icon-22" src="/icons/sidebar/settings-menu.png" />,
            key: "setting",
            children: [
                {
                    key: "cameraManagement",
                    label: <div className="side-bar-submenu">カメラ管理</div>
                },
                {
                    key: "cameraFunction",
                    label: <div className="side-bar-submenu">カメラ機能</div>
                },
                {
                    key: "recordingSetting",
                    label: <div className="side-bar-submenu">録画設定</div>
                },
                {
                    key: "storageManagement",
                    label: <div className="side-bar-submenu">ストレージ管理</div>
                },
                {
                    key: "ioContact",
                    label: <div className="side-bar-submenu">接点入出力</div>
                },
                {
                    key: "userManagement",
                    label: <div className="side-bar-submenu">ユーザー管理</div>
                }
            ]
        },
        {
            label: <div className="side-bar-menu">履歴</div>,
            icon: <img className="icon-22" src="/icons/sidebar/recorder-menu.png" />,
            key: "recorder",
            children: [
                {
                    key: "recorder1",
                    label: <div className="side-bar-submenu">ＯＯＯＯ</div>
                },
                {
                    key: "recorder2",
                    label: <div className="side-bar-submenu">ＯＯＯＯ</div>
                }
            ]
        },
        {
            label: <div className="side-bar-menu">保守</div>,
            icon: <img className="icon-22" src="/icons/sidebar/maintenance-menu.png" />,
            key: "maintenance",
            children: [
                {
                    key: "maintenance1",
                    label: <div className="side-bar-submenu">ＯＯＯＯ</div>
                }
            ]
        }
    ];

    const layoutProfiles = [
        { value: 1, label: "1." },
        { value: 2, label: "2." },
        { value: 3, label: "3." },
        { value: 5, label: "5." },
        { value: 6, label: "6." },
        { value: 7, label: "7." }
    ];

    const onOpenChange: MenuProps["onOpenChange"] = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const handleContextMenu = (event: React.MouseEvent, streamPosition: number) => {
        event.preventDefault();
        const changeCam = selectedStream != streamPosition;
        setSelectedStream(streamPosition);
        setContextMenu(
            (!contextMenu.isNotNull || (contextMenu.isNotNull && changeCam))
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
                }
        );
    };

    const handleCloseMenuCam = () => {
        setContextMenu({ mouseX: 0, mouseY: 0, isNotNull: false });
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
                            <img className="icon-22" src="/icons/recording.png" />
                        </div>
                        <div ref={videoContainerRef} className="video-container" style={{ width: 1280, height: 720 }}>
                            <div id="block1" className={"space-align-block " + setBlockSize(1)}>
                                <WebrtcPlayer
                                    url={`${process.env.REACT_APP_LIVE_SERVER_HOST}/stream/41251ba0-be89-457f-8b1a-3f6a4ddaaedf/channel/0/webrtc?uuid=41251ba0-be89-457f-8b1a-3f6a4ddaaedf&channel=0`}
                                    style={{ border: selectedStream == 1 ? "solid 2px #f15a24" : "none" }}
                                    width={setWidth(1)}
                                    height={setHeight(1)}
                                    onClick={(e) => handleContextMenu(e, 1)}
                                />
                            </div>

                            {(viewMode != ONE_STREAM) ?
                                (<div id="block2" className={"space-align-block " + setBlockSize()}>
                                    <WebrtcPlayer
                                        url={`${process.env.REACT_APP_LIVE_SERVER_HOST}/stream/bff3a176-a0ad-4778-9b55-1406d1cefa9e/channel/0/webrtc?uuid=bff3a176-a0ad-4778-9b55-1406d1cefa9e&channel=0`}
                                        style={{ border: selectedStream == 2 ? "solid 2px #f15a24" : "none" }}
                                        width={setWidth()}
                                        height={setHeight()}
                                        onClick={(e) => handleContextMenu(e, 2)}
                                    />
                                </div>) : null}
                            {(viewMode != ONE_STREAM) ?
                                (<div id="block3" className={"space-align-block " + setBlockSize()}>
                                    <WebrtcPlayer
                                        url={`${process.env.REACT_APP_LIVE_SERVER_HOST}/stream/eaf6861d-8acd-4d00-b909-dba68be9832d/channel/0/webrtc?uuid=eaf6861d-8acd-4d00-b909-dba68be9832d&channel=0`}
                                        style={{ border: selectedStream == 3 ? "solid 2px #f15a24" : "none" }}
                                        width={setWidth()}
                                        height={setHeight()}
                                        onClick={(e) => handleContextMenu(e, 3)}
                                    />
                                </div>) : null}
                            {(viewMode != ONE_STREAM) ?
                                (<div id="block4" className={"space-align-block " + setBlockSize()}>
                                    <WebrtcPlayer
                                        url={`${process.env.REACT_APP_LIVE_SERVER_HOST}/stream/6279629d-eb8e-4b87-a03f-43adb05f2ecc/channel/0/webrtc?uuid=6279629d-eb8e-4b87-a03f-43adb05f2ecc&channel=0`}
                                        style={{ border: selectedStream == 4 ? "solid 2px #f15a24" : "none" }}
                                        width={setWidth()}
                                        height={setHeight()}
                                        onClick={(e) => handleContextMenu(e, 4)}
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
                                        {/*<Select*/}
                                        {/*    menuIsOpen={true}*/}
                                        {/*    defaultValue={currentProfile}*/}
                                        {/*    onChange={setCurrentProfile}*/}
                                        {/*    options={layoutProfiles}*/}
                                        {/*    maxMenuHeight={96}*/}
                                        {/*/>*/}
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
                                            icon={<CloseOutlined style={{ fontSize: 22, color: "gray" }} />}
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
                                    onClose={handleCloseMenuCam} />
                        : <></>}
                </div>
            }
        />
    );
};

export default LiveView;
