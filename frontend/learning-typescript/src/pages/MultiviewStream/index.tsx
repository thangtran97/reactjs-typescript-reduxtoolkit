//@ts-nocheck
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css";
import Page from "../../components/Page";
import { Button, Menu, MenuProps, Modal, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllStream, selectValues } from "../../store/streamSlice";
import WebrtcPlayer from "../../components/WebrtcPlayer";

const MultiviewStream: React.FC = () => {
    const dispatch = useAppDispatch();
    const streams = useAppSelector(selectValues);
    const [currentIndex, setCurrentIndex] = useState<number>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<string>("3");
    const [streamUrl, setStreamUrl] = useState({
        url1: "",
        url2: "",
        url3: "",
        url4: "",
        url5: "",
        url6: "",
        url7: "",
        url8: "",
        url9: "",
        url10: "",
        url11: "",
        url12: "",
        url13: "",
        url14: "",
        url15: "",
        url16: ""
    });

    const handleSelectStream: MenuProps["onClick"] = e => {
        setStreamUrl(prevState => ({
            ...prevState,
            [`url${currentIndex}`]: e.key
        }));
        setIsModalOpen(false);
    };

    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, id: number) => {
        setCurrentIndex(id);
        setIsModalOpen(true);
    };

    const handleCloseVideo = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>, id: number) => {
        e.preventDefault();
        setStreamUrl(prevState => ({
            ...prevState,
            [`url${id}`]: ""
        }));
    };

    const handleChangeViewMode = (value: string) => {
        setViewMode(value);
    };

    const setBlockSize = () => {
        if (viewMode == "1") {
            return "block-2x2";
        } else if (viewMode == "2") {
            return "block-3x3";
        } else if (viewMode == "3") {
            return "block-4x4";
        }
    };

    const setWidth = () => {
        if (viewMode == "1") {
            return 683;
        } else if (viewMode == "2") {
            return 455.33;
        } else if (viewMode == "3") {
            return 341.5;
        }
    };

    const setHeight = () => {
        if (viewMode == "1") {
            return 384;
        } else if (viewMode == "2") {
            return 256;
        } else if (viewMode == "3") {
            return 192;
        }
    };

    useEffect(() => {
        dispatch(getAllStream());
    }, [dispatch]);

    return (
        <Page
            content={
                <div>
                    <Row style={{ marginBottom: 24 }}>
                        <Select
                            style={{ width: "15%" }}
                            value={viewMode}
                            onChange={handleChangeViewMode}
                        >
                            <Select.Option value="1">2x2</Select.Option>
                            <Select.Option value="2">3x3</Select.Option>
                            <Select.Option value="3">4x4</Select.Option>
                        </Select>
                    </Row>
                    <div style={{ width: 1366, height: 768 }}>
                        <div className={"space-align-block " + setBlockSize()}>
                            {streamUrl.url1 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url1}/channel/0/webrtc?${streamUrl.url1}&channel=0`}
                                    width={setWidth()}
                                    height={setHeight()}
                                    hasClose={true}
                                    onClose={(e) => handleCloseVideo(e, 1)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 1)}
                                />}
                        </div>
                        <div className={"space-align-block " + setBlockSize()}>
                            {streamUrl.url2 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url2}/channel/0/webrtc?${streamUrl.url2}&channel=0`}
                                    width={setWidth()}
                                    height={setHeight()}
                                    hasClose={true}
                                    onClose={(e) => handleCloseVideo(e, 2)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 2)}
                                />}
                        </div>
                        <div className={"space-align-block " + setBlockSize()}>
                            {streamUrl.url3 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url3}/channel/0/webrtc?${streamUrl.url3}&channel=0`}
                                    width={setWidth()}
                                    height={setHeight()}
                                    hasClose={true}
                                    onClose={(e) => handleCloseVideo(e, 3)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 3)}
                                />}
                        </div>
                        <div className={"space-align-block " + setBlockSize()}>
                            {streamUrl.url4 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url4}/channel/0/webrtc?${streamUrl.url4}&channel=0`}
                                    width={setWidth()}
                                    height={setHeight()}
                                    hasClose={true}
                                    onClose={(e) => handleCloseVideo(e, 4)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 4)}
                                />}
                        </div>
                        {(viewMode == "2" || viewMode == "3") ?
                            (<div className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url5 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url5}/channel/0/webrtc?${streamUrl.url5}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 5)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 5)}
                                    />}
                            </div>) : null}
                        {(viewMode == "2" || viewMode == "3") ?
                            (<div className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url6 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url6}/channel/0/webrtc?${streamUrl.url6}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 6)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 6)}
                                    />}
                            </div>) : null}
                        {(viewMode == "2" || viewMode == "3") ?
                            (<div className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url7 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url7}/channel/0/webrtc?${streamUrl.url7}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 7)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 7)}
                                    />}
                            </div>) : null}
                        {(viewMode == "2" || viewMode == "3") ?
                            (<div className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url8 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url8}/channel/0/webrtc?${streamUrl.url8}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 8)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 8)}
                                    />}
                            </div>) : null}
                        {(viewMode == "2" || viewMode == "3") ?
                            (<div className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url9 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url9}/channel/0/webrtc?${streamUrl.url9}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 9)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 9)}
                                    />}
                            </div>) : null}
                        {(viewMode == "3") ?
                            (<div className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url10 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url10}/channel/0/webrtc?${streamUrl.url10}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 10)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 10)}
                                    />}
                            </div>) : null}
                        {(viewMode == "3") ?
                            (<div className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url11 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url11}/channel/0/webrtc?${streamUrl.url11}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 11)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 11)}
                                    />}
                            </div>) : null}
                        {(viewMode == "3") ?
                            (<div className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url12 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url12}/channel/0/webrtc?${streamUrl.url12}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 12)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 12)}
                                    />}
                            </div>) : null}
                        {(viewMode == "3") ?
                            (<div className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url13 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url13}/channel/0/webrtc?${streamUrl.url13}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 13)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 13)}
                                    />}
                            </div>) : null}
                        {(viewMode == "3") ?
                            (<div className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url14 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url14}/channel/0/webrtc?${streamUrl.url14}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 14)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 14)}
                                    />}
                            </div>) : null}
                        {(viewMode == "3") ?
                            (<div className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url15 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url15}/channel/0/webrtc?${streamUrl.url15}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 15)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 15)}
                                    />}
                            </div>) : null}
                        {(viewMode == "3") ?
                            (<div className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url16 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url16}/channel/0/webrtc?${streamUrl.url16}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 16)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 16)}
                                    />}
                            </div>) : null}
                    </div>
                    <Modal
                        title="Select stream"
                        open={isModalOpen}
                        footer={null}
                        onCancel={() => setIsModalOpen(false)}
                    >
                        <Menu
                            items={streams}
                            onClick={(e) => handleSelectStream(e)}
                        />
                    </Modal>
                </div>
            }
        />
    );
};

export default MultiviewStream;
